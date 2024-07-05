export namespace Network {
  export type Info = {
    network_id: number
    user_id?: number
    ip_range?: string
    name?: string
    created_at?: string
    updated_at?: string
  }

  export type CreateRequest = {
    ip_range: string
    name?: string
  }

  export type IpRangeRandRequest = {
    num?: number
  }
}
