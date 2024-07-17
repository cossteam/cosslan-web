import {Request} from "@/api/types/_base.ts";

export namespace NetworkMachine {
  export type Info = {
    id: number;
    arch?: string;
    client_ip?: string;
    connected_at?: string;
    hostname?: string;
    kernel?: string;
    machine_id?: number;
    network_id?: number;
    platform?: string;
    public_ip?: string;
    user_id?: number;
    user_email?: string;
    user_name?: string;
    version?: string;
  }

  export type CreateDevice = {
    desc?: string;
    label?: string;
    name?: string;
    qr?: string;
    tip?: string;
    url?: string;
  }

  export type CreateDeviceRequest = {
    platform: string;
  }

  export type ListRequest = Request.Page &{
    network_id: number;
  }
}
