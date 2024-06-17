import http from "../index";
import {NetworkUser} from "@/api/types/network-user.ts";

export const networkUserList = (params: NetworkUser.ListRequest) => {
  return http.get<NetworkUser.InfoJoinUser[]>('network_user/list', params)
};

export const networkUserInvite = (params: NetworkUser.InviteRequest) => {
  return http.post('network_user/invite', params)
};
