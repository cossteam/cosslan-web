export namespace User {
  export type Info = {
    user_id?: number
    email?: string
    nickname?: string
    avatar?: string
    password?: string
    token?: string
    created_at?: string
    updated_at?: string
  }

  export type LoginRequest = {
    email: string,
    password: string,
  }

  export type SaveRequest = {
    nickname: string,
  }
}
