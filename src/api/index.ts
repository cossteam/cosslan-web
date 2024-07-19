import axios, {AxiosInstance, AxiosRequestConfig} from 'axios'
import utils from "../lib/utils";
import {Response} from "./types/_base";
import {userState} from "@/lib/state";

const config = {
  baseURL: '/api/v1',     // 所有的请求地址前缀部分
  timeout: 60000,         // 请求超时时间毫秒
  withCredentials: true,  // 异步请求携带cookie
}

const ApiUrl = (url: string) => {
  if (url.substring(0, 2) === "//" ||
    url.substring(0, 7) === "http://" ||
    url.substring(0, 8) === "https://" ||
    url.substring(0, 6) === "ftp://" ||
    url.substring(0, 1) === "/") {
    return url;
  }
  url = config.baseURL + "/" + url
  while (url.indexOf("/../") !== -1) {
    url = url.replace(/\/(((?!\/).)*)\/\.\.\//, "/")
  }
  return url
}

const MainUrl = (url: string) => {
  if (url.substring(0, 2) === "//" ||
    url.substring(0, 7) === "http://" ||
    url.substring(0, 8) === "https://" ||
    url.substring(0, 6) === "ftp://" ||
    url.substring(0, 1) === "/") {
    return url;
  }
  return ApiUrl(`../${url}`)
}

const ResponseFormat = (data: any) => {
  if (typeof data === "string") {
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(data)) {
      data = utils.formatDate("Y-m-d H:i:s", new Date(data))
    }
  } else if (utils.isArray(data)) {
    return data.map((item: any) => ResponseFormat(item))
  } else if (utils.isJson(data)) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = ResponseFormat(data[key])
      }
    }
  }
  return data
}

export {ApiUrl, MainUrl, ResponseFormat}

class RequestHttp {
  // 定义成员变量并指定类型
  service: AxiosInstance;

  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config);

    /**
     * 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     */
    this.service.interceptors.request.use(
      config => {
        const {token} = userState.getState()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      error => {
        // 对请求错误做些什么
        return Promise.reject(error)
      }
    )

    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      ({data}) => {
        // 状态码 2xx 范围内的状态码都会触发该函数。
        if (!utils.isJson(data)) {
          // 格式错误
          return Promise.reject({code: 422, msg: "Format error", data})
        }
        if (data.code === 200) {
          // 请求成功
          return ResponseFormat(data)
        }
        if ([301, 302].includes(data.code)) {
          // 重定向
          const params = {
            code: data.code,
            msg: encodeURIComponent(data.msg),
          }
          window.location.href = utils.urlAddParams(window.location.href, params)
        }
        if (data.code === 401) {
          // 身份验证失败
          userState.setState({user_id: 0})
        }
        return Promise.reject(data)
      },
      error => {
        // 状态码超出 2xx 范围的状态码都会触发该函数。
        return Promise.reject({code: 421, msg: "Request failed", data: error})
      }
    )
  }

  // 自定义方法封装（常用请求）
  get<T>(url: string, params?: object): Promise<Response.Base<T>> {
    return this.service.get(url, {params});
  }

  post<T>(url: string, params?: object): Promise<Response.Base<T>> {
    return this.service.post(url, params);
  }

  put<T>(url: string, params?: object): Promise<Response.Base<T>> {
    return this.service.put(url, params);
  }

  delete<T>(url: string, params?: object): Promise<Response.Base<T>> {
    return this.service.delete(url, {params});
  }
}

export default new RequestHttp(config);
