import http from "../index";
import {Request, Response} from "@/api/types/_base.ts";
import {UserNotification} from "@/api/types/user-notification.ts";

export const userNotificationList = (params: Request.Page) => {
  return http.get<Response.ListData<UserNotification.Info>>('user_notification/list', params)
};

export const userNotificationUnread = () => {
  return http.get<{unread:number}>('user_notification/unread')
};
