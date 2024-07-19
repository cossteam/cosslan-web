import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import React from "react";
import {alerter} from "@/components/ui+/use-alert.ts";
import {userState} from "@/lib/state.ts";
import {userLogout} from "@/api/interfaces/user.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function onLogout(event: React.MouseEvent<HTMLAnchorElement>) {
  const target = event.currentTarget
  if (target.tagName === 'A') {
    const href = target.getAttribute('href')
    if (/\/logout$/i.test(`${href}`)) {
      event.preventDefault()
      alerter({
        title: "Logout",
        description: "Are you sure you want to logout?",
        onOk: () => {
          userState.setState({user_id: 0})
          userLogout()
        },
      })
    }
  }
}

const utils = {
  /**
   * 会话ID
   */
  sessionId() {
    if (utils._sessionId === "") {
      utils._sessionId = utils.randomString(16)
    }
    return utils._sessionId
  },
  _sessionId:"",

  /**
   * 简单判断IPv4地址
   * @param value
   */
  isIpv4(value: string) {
    return /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(value)
  },

  /**
   * 判断是否为空
   * @param value
   */
  isEmpty(value: any) {
    return value === null
      || value === undefined
      || value === "null"
      || value === "undefined"
      || value.replace(/\s/g, '') === "";
  },

  /**
   * 是否数组
   * @param obj
   * @returns {boolean}
   */
  isArray(obj: any): boolean {
    return typeof obj === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object array]' && typeof obj.length === 'number';
  },

  /**
   * 是否数组对象
   * @param obj
   * @returns {boolean}
   */
  isJson(obj: any): boolean {
    return typeof obj === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && typeof obj.length === 'undefined';
  },

  /**
   * 获取对象值
   * @param obj
   * @param key
   * @returns {*}
   */
  getObject(obj: any, key: string): any {
    if (typeof obj === 'string' && /^\s*(\{|\[)/.test(obj)) {
      obj = utils.jsonParse(obj);
    }
    const keys = key.replace(/,/g, '|').replace(/\./g, '|').split('|');
    while (keys.length > 0) {
      const k = `${keys.shift()}`;
      if (utils.isArray(obj)) {
        obj = obj[utils.parseInt(k)] || '';
      } else if (utils.isJson(obj)) {
        obj = obj[k] || '';
      } else {
        break;
      }
    }
    return obj;
  },

  /**
   * 转成数字
   * @param param
   * @returns {number|number}
   */
  parseInt(param: any): number {
    const num = parseInt(param);
    return isNaN(num) ? 0 : num;
  },

  /**
   * 是否在数组里
   * @param key
   * @param array
   * @param regular
   * @returns {boolean|*}
   */
  inArray(key: string, array: any[], regular: boolean = false): boolean | any {
    if (!utils.isArray(array)) {
      return false;
    }
    if (regular) {
      return !!array.find(item => {
        if (item && item.indexOf('*')) {
          const rege = new RegExp('^' + item.replace(/[-/\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*') + '$', 'g');
          if (rege.test(key)) {
            return true;
          }
        }
        return item === key;
      });
    } else {
      return array.includes(key);
    }
  },

  /**
   * 克隆对象
   * @param myObj
   * @returns {*}
   */
  cloneJSON(myObj: any): any {
    if (typeof myObj !== 'object') return myObj;
    if (myObj === null) return myObj;
    //
    return utils.jsonParse(utils.jsonStringify(myObj));
  },

  /**
   * 将一个 JSON 字符串转换为对象（已try）
   * @param str
   * @param defaultVal
   * @returns {*}
   */
  jsonParse(str: any, defaultVal?: any): any {
    if (str === null) {
      return defaultVal ? defaultVal : {};
    }
    if (typeof str === 'object') {
      return str;
    }
    try {
      return JSON.parse(str.replace(/\n/g, '\\n').replace(/\r/g, '\\r'));
    } catch (e) {
      return defaultVal ? defaultVal : {};
    }
  },

  /**
   * 将 JavaScript 值转换为 JSON 字符串（已try）
   * @param json
   * @param defaultVal
   * @returns {string}
   */
  jsonStringify(json: any, defaultVal?: any): string {
    if (typeof json !== 'object') {
      return json;
    }
    try {
      return JSON.stringify(json);
    } catch (e) {
      return defaultVal ? defaultVal : "";
    }
  },

  /**
   * 字符串是否包含
   * @param string
   * @param find
   * @param lower
   * @returns {boolean}
   */
  strExists(string: string, find: string, lower: boolean = false): boolean {
    string += '';
    find += '';
    if (!lower) {
      string = string.toLowerCase();
      find = find.toLowerCase();
    }
    return (string.indexOf(find) !== -1);
  },

  /**
   * 字符串是否左边包含
   * @param string
   * @param find
   * @param lower
   * @returns {boolean}
   */
  leftExists(string: string, find: string, lower: boolean = false): boolean {
    string += '';
    find += '';
    if (!lower) {
      string = string.toLowerCase();
      find = find.toLowerCase();
    }
    return (string.substring(0, find.length) === find);
  },

  /**
   * 删除左边字符串
   * @param string
   * @param find
   * @param lower
   * @returns {string}
   */
  leftDelete(string: string, find: string, lower: boolean = false): string {
    string += '';
    find += '';
    if (utils.leftExists(string, find, lower)) {
      string = string.substring(find.length);
    }
    return string ? string : '';
  },

  /**
   * 字符串是否右边包含
   * @param string
   * @param find
   * @param lower
   * @returns {boolean}
   */
  rightExists(string: string, find: string, lower: boolean = false): boolean {
    string += '';
    find += '';
    if (!lower) {
      string = string.toLowerCase();
      find = find.toLowerCase();
    }
    return (string.substring(string.length - find.length) === find);
  },

  /**
   * 删除右边字符串
   * @param string
   * @param find
   * @param lower
   * @returns {string}
   */
  rightDelete(string: string, find: string, lower: boolean = false): string {
    string += '';
    find += '';
    if (utils.rightExists(string, find, lower)) {
      string = string.substring(0, string.length - find.length);
    }
    return string ? string : '';
  },

  /**
   * 随机字符串
   * @param len
   */
  randomString(len: number = 8): string {
    len = len || 32;
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678oOLl9gqVvUuI1';
    const maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },

  /**
   * 检测手机号码格式
   * @param str
   * @returns {boolean}
   */
  isPhone(str: string): boolean {
    return /^1([3456789])\d{9}$/.test(str);
  },

  /**
   * 检测邮箱地址格式
   * @param email
   * @returns {boolean}
   */
  isEmail(email: string): boolean {
    return /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*\.)+[a-zA-Z]*)$/i.test(email);
  },

  /**
   * 返回10位数时间戳
   * @param v
   * @returns {number}
   * @constructor
   */
  Time(v: any = undefined): number {
    let time
    if (typeof v === "string" && this.strExists(v, "-")) {
      v = v.replace(/-/g, '/');
      time = new Date(v).getTime();
    } else {
      time = new Date().getTime();
    }
    return Math.round(time / 1000)
  },

  /**
   * 返回 时间对象|时间戳
   * @param v
   * @param stamp 是否返回时间戳
   * @returns {Date|number}
   * @constructor
   */
  Date(v: any, stamp = false): Date | number {
    if (typeof v === "string" && this.strExists(v, "-")) {
      v = v.replace(/-/g, '/');
    }
    if (stamp) {
      return Math.round(new Date(v).getTime() / 1000)
    }
    return new Date(v);
  },

  /**
   * 时间戳转时间格式
   * @param format
   * @param v
   * @returns {string}
   */
  formatDate(format: any = undefined, v: any = undefined): string {
    if (typeof format === 'undefined' || format === '') {
      format = 'Y-m-d H:i:s';
    }
    let dateObj: any;
    if (v instanceof Date) {
      dateObj = v;
    } else {
      if (typeof v === 'undefined') {
        v = new Date().getTime();
      } else if (/^(-)?\d{1,10}$/.test(v)) {
        v = v * 1000;
      } else if (/^(-)?\d{1,13}$/.test(v)) {
        v = v * 1000;
      } else if (/^(-)?\d{1,14}$/.test(v)) {
        v = v * 100;
      } else if (/^(-)?\d{1,15}$/.test(v)) {
        v = v * 10;
      } else if (/^(-)?\d{1,16}$/.test(v)) {
        v = v * 1;
      } else {
        return v;
      }
      dateObj = this.Date(v);
    }
    //
    format = format.replace(/Y/g, dateObj.getFullYear());
    format = format.replace(/m/g, this.zeroFill(dateObj.getMonth() + 1, 2));
    format = format.replace(/d/g, this.zeroFill(dateObj.getDate(), 2));
    format = format.replace(/H/g, this.zeroFill(dateObj.getHours(), 2));
    format = format.replace(/i/g, this.zeroFill(dateObj.getMinutes(), 2));
    format = format.replace(/s/g, this.zeroFill(dateObj.getSeconds(), 2));
    return format;
  },

  /**
   * 获取时间差（秒）
   * @param date
   * @param date2
   * @returns {string}
   */
  secondDiff(date: any, date2: any = undefined): number {
    if (typeof date2 === 'undefined') {
      date2 = new Date().getTime();
    }
    if (typeof date === 'string') {
      date = new Date(date).getTime();
    }
    return Math.round((date2 - date) / 1000);
  },

  /**
   * 补零
   * @param str
   * @param length
   * @param after
   * @returns {*}
   */
  zeroFill(str: string, length: number, after = false): string {
    str += "";
    if (str.length >= length) {
      return str;
    }
    let _str = '', _ret = '';
    for (let i = 0; i < length; i++) {
      _str += '0';
    }
    if (after) {
      _ret = `${str}${_str}`
      return _ret.substring(0, length);
    } else {
      _ret = `${_str}${str}`
      return _ret.substring(_ret.length - length);
    }
  },

  /**
   * 指定键获取 url 参数
   * @param key
   * @returns {*}
   */
  urlParameter(key: string): any {
    const params = utils.urlParameterAll();
    return typeof key === 'undefined' ? params : params[key];
  },

  urlParameterAll(): any {
    let search = window.location.search || window.location.hash || '';
    const index = search.indexOf('?');
    if (index !== -1) {
      search = search.substring(index + 1);
    }
    const arr = search.split('&');
    const params: any = {};
    arr.forEach((item) => { // 遍历数组
      const index = item.indexOf('=');
      if (index === -1) {
        params[item] = '';
      } else {
        params[item.substring(0, index)] = item.substring(index + 1);
      }
    });
    return params;
  },

  /**
   * 删除地址中的参数
   * @param url
   * @param parameter
   * @returns {string|*}
   */
  removeURLParameter(url: string, parameter: string | string[]): string | any {
    if (Array.isArray(parameter)) {
      parameter.forEach((key) => {
        url = utils.removeURLParameter(url, key);
      });
      return url;
    }
    const urlParts = url.split('?');
    if (urlParts.length >= 2) {
      //参数名前缀
      const prefix = encodeURIComponent(parameter) + '=';
      const pars = urlParts[1].split(/[&;]/g);

      //循环查找匹配参数
      for (let i = pars.length; i-- > 0;) {
        if (pars[i].lastIndexOf(prefix, 0) !== -1) {
          //存在则删除
          pars.splice(i, 1);
        }
      }

      return urlParts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
    }
    return url;
  },

  /**
   * 连接加上参数
   * @param url
   * @param params
   * @returns {*}
   */
  urlAddParams(url: string, params: any): string {
    if (utils.isJson(params)) {
      if (url) {
        url = utils.removeURLParameter(url, Object.keys(params));
      }
      url += '';
      url += url.indexOf('?') === -1 ? '?' : '';
      for (const key in params) {
        if (!Object.prototype.hasOwnProperty.call(params, key)) {
          continue;
        }
        url += '&' + key + '=' + params[key];
      }
    } else if (params) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + params;
    }
    if (!url) {
      return '';
    }
    return utils.rightDelete(url.replace('?&', '?'), '?');
  },

  /**
   * 名字缩写
   * @param name
   */
  abbreviatedName(name: string) {
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  },

  /**
   * 名字生成颜色
   * @param name
   */
  generateColorByName(name: string) {
    let unicodeCode = '';
    for (let i = 0; i < name.length; i++) {
      unicodeCode += name.charCodeAt(i).toString(16);
    }
    const colorCode = parseInt(unicodeCode, 16) % 0xFFFFFF;
    if (isNaN(colorCode) || colorCode < 0x100000) {
      return "hsl(var(--muted))";
    }
    return '#' + colorCode.toString(16);
  },

  /**
   * 首字母大写
   * @param str
   */
  capitalizeFirstLetter(str?: string) {
    if (!str) {
      return str
    }
    if (str.length > 1) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str.charAt(0).toUpperCase();
  },

  /**
   * 流量转换
   * @param value
   */
  trafficConversion(value: number) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;

    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex++;
    }

    return `${value.toFixed(2)}${units[unitIndex]}`;
  },

  /**
   * 阻止默认事件
   * @param event
   */
  preventDefault(event: Event) {
    event.preventDefault();
  }
};

export default utils
