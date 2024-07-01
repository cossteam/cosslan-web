import http from "../index";
import {Machine} from "@/api/types/machine.ts";

export const machineCreateDevice = (params: Machine.CreateDeviceRequest) => {
  return http.get<Machine.Info>('machine/create_device', params)
};
