import axios, {AxiosInstance, AxiosRequestConfig} from 'axios'
import utils from "../lib/utils";
import {Response} from "./types/base";
import {userState} from "@/lib/state";

const config = {
  baseURL: '/api',        // 所有的请求地址前缀部分
  timeout: 60000,         // 请求超时时间毫秒
  withCredentials: true,  // 异步请求携带cookie
  headers: {
    Token: userState.getState().token,
  },
}

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
      function (config) {
        return config
      },
      function (error) {
        // 对请求错误做些什么
        // console.log(error)
        return Promise.reject(error)
      }
    )

    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        const dataAxios = response.data
        //
        if (!utils.isJson(dataAxios)) {
          return Promise.reject({code: 0, msg: "Format error", data: dataAxios})
        }
        if (dataAxios.code !== 200) {
          if (dataAxios.code === 301 || dataAxios.code === 401) {
            const params = {
              result_code: dataAxios.code,
              result_msg: encodeURIComponent(dataAxios.msg),
            }
            window.location.href = utils.urlAddParams(window.location.href, params)
          }
          return Promise.reject(dataAxios)
        }
        return dataAxios
      },
      function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        return Promise.reject({code: 0, msg: "Request failed", data: error})
      }
    )
  }

  // 自定义方法封装（常用请求）
  get<T>(url: string, params?: object): Promise<Response<T>> {
    return this.service.get(url, {params});
  }

  post<T>(url: string, params?: object): Promise<Response<T>> {
    return this.service.post(url, params);
  }

  put<T>(url: string, params?: object): Promise<Response<T>> {
    return this.service.put(url, params);
  }

  delete<T>(url: string, params?: object): Promise<Response<T>> {
    return this.service.delete(url, {params});
  }
}

export default new RequestHttp(config);
