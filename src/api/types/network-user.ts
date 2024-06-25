export namespace NetworkUser {
  export type Info = {
    id?: number
    network_id?: number
    user_id?: number
    state?: string
    role?: string
    created_at?: string
    updated_at?: string
  }

  export type InfoJoinUser = Info & {
    user_name?: string
    user_email?: string
  }

  export type ListRequest = {
    network_id: number
  }

  export type InviteRequest = {
    network_id: number
    user_id: string
    role: string
  }
}
