import http from "../index";
import {Network} from "@/api/types/network";
import {Response} from "@/api/types/_base.ts";

export const networkList = () => {
  return http.get<Response.List<Network.Info>>('network/list')
};

export const networkCreate = (params: Network.CreateRequest) => {
  return http.post('network/create', params)
};

export const networkIpRangeRand = (params: Network.IpRangeRandRequest) => {
  return http.get<Response.List<string>>('network/ip_range_rand', params)
};
