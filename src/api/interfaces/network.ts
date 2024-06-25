import http from "../index";
import {Network} from "@/api/types/network";

export const networkList = () => {
  return http.get<{ list: Network.Info[] }>('network/list')
};

export const networkIpRangeRand = (params: Network.IpRangeRandRequest) => {
  return http.get<{ list: string[] }>('network/ip_range_rand', params)
};

export const networkCreate = (params: Network.CreateRequest) => {
  return http.post<Network.Info>('network/create', params)
};
