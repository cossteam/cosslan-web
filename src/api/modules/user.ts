import http from "../index";
import {User} from "../types/user";

export const userInfo = () => {
    return http.get<User.Info>('user/info')
};

export const userLogin = (params: User.LoginRequest) => {
    return http.post<User.Info>('user/login', params)
};

export const userReg = (params: User.LoginRequest) => {
    return http.post<User.Info>('user/reg', params)
};

export const userSave = (params: User.SaveRequest) => {
    return http.post<User.Info>('user/save', params)
};
