import http from "../index";
import {UserSetting} from "@/api/types/user-setting.ts";

export const userSettingInfo = (params: UserSetting.GetRequest) => {
    return http.get<UserSetting.Info>('user_setting/info', params)
};

export const userSettingSave = (params: UserSetting.SaveRequest) => {
    return http.post<UserSetting.Info>('user_setting/save', params)
};
