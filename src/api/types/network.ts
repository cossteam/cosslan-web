export namespace Network {
  export type Info = {
    net_id?: number
    user_id?: number
    ipv4?: string
    name?: string
    created_at?: string
    updated_at?: string
  }

  export type CreateRequest = {
    ipv4: string
    name?: string
  }

  export type Ipv4Rand = string[]

  export type Ipv4RandRequest = {
    num: number
  }
}
