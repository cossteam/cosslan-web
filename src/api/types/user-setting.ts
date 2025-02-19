export namespace UserSetting {
  export type Info = {
    id?: number
    user_id?: number
    name?: string
    content?: string;
    created_at?: string
    updated_at?: string
  }

  export type GetRequest = {
    name: string,
  }

  export type UpdateRequest = {
    name: string,
    content: string;
  }
}
