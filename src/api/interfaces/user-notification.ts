import http from "../index";
import {PageRequest, ResponseListData} from "@/api/types/_base.ts";
import {UserNotification} from "@/api/types/user-notification.ts";

export const userNotificationList = (params: PageRequest) => {
  return http.get<ResponseListData<UserNotification.Info>>('user_notification/list', params)
};
