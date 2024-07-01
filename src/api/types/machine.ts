export namespace Machine {
  export type Info = {
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
}
