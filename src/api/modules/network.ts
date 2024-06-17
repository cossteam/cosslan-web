import http from "../index";
import {Network} from "@/api/types/network";

export const networkList = () => {
  return http.get<Network.Info[]>('network/list')
};

export const networkIpv4Rand = (params: Network.Ipv4RandRequest) => {
  return http.get<Network.Ipv4Rand>('network/ipv4_rand', params)
};

export const networkCreate = (params: Network.CreateRequest) => {
  return http.post<Network.Info>('network/create', params)
};
