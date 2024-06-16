export namespace UserSetting {
  export type Info = {
    id?: number
    user_id?: number
    name?: string
    content?: object
    created_at?: string
    updated_at?: string
  }

  export type GetRequest = {
    name: string,
  }

  export type SaveRequest = {
    name: string,
    content: object,
  }
}
