export namespace NetworkUser {
  export type Info = {
    id?: number
    net_id?: number
    user_id?: number
    state?: string
    role?: string
    created_at?: string
    updated_at?: string
  }

  export type InfoJoinUser = Info & {
    user_nickname?: string
    user_email?: string
  }

  export type ListRequest = {
    net_id: number
  }

  export type InviteRequest = {
    net_id: number
    email: string
    role: number
  }
}
