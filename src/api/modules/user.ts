import http from "../index";
import {User} from "../types/user";

export const userInfo = () => {
    return http.get<User.Info>('user/info')
};

export const userLogin = (params: User.LoginRequest) => {
    return http.post<User.Info>('user/login', params)
};

export const userLogout = () => {
    return http.get('user/logout')
};

export const userReg = (params: User.LoginRequest) => {
    return http.post<User.Info>('user/reg', params)
};

export const userUpdate = (params: User.UpdateRequest) => {
    return http.post<User.Info>('user/update', params)
};

export const userSearch = (params: User.SearchRequest) => {
    return http.post<User.InfoSimple[]>('user/search', params)
};
