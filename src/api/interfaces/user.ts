import http from "../index";
import {User} from "../types/user";
import {userState} from "@/lib/state.ts";
import {Response} from "@/api/types/_base.ts";

export const userInfo = () => {
  return http.get<User.Info>('user/info')
};

export const userRegister = (params: User.LoginRequest) => {
  return http.post<User.Info>('user/register', params)
};

export const userLogin = (params: User.LoginRequest) => {
  return http.post<User.Info>('user/login', params)
};

export const userLogout = () => {
  userState.setState({user_id: 0})
  http.get('user/logout').catch(() => {
  })
};

export const userUpdate = (params: User.UpdateRequest) => {
  return http.post<User.Info>('user/update', params)
};

export const userSearch = (params: User.SearchRequest) => {
  return http.post<Response.List<User.InfoSimple>>('user/search', params)
};
