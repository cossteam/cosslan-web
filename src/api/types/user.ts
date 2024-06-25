export namespace User {
  export type Info = {
    user_id?: number
    email?: string
    name?: string
    avatar?: string
    token?: string
    created_at?: string
    updated_at?: string
  }

  export type InfoSimple = {
    user_id?: number
    email?: string
    name?: string
    avatar?: string
  }

  export type LoginRequest = {
    email: string,
    password: string,
  }

  export type UpdateRequest = {
    name: string,
  }

  export type SearchRequest = {
    key: string,
  }
}
