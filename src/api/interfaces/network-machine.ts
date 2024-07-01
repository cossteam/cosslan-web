import http from "../index";
import {NetworkMachine} from "@/api/types/network-machine.ts";
import {Response} from "@/api/types/_base.ts";

export const networkMachineList = (params: NetworkMachine.ListRequest) => {
  return http.get<Response.ListData<NetworkMachine.Info>>('network_machine/list', params)
}

export const networkMachineCreateDevice = (params: NetworkMachine.CreateDeviceRequest) => {
  return http.get<NetworkMachine.CreateDevice>('network_machine/create_device', params)
};
