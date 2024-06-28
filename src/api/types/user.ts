export namespace User {
  export type Info = {
    user_id?: number
    email?: string
    name?: string
    avatar?: string
    token?: string
    created_at?: string
    updated_at?: string
    notification_unread?: number
  }

  export type InfoSimple = {
    user_id?: number
    email?: string
    name?: string
    avatar?: string
  }

  export type LoginRequest = {
    email: string;
    name?: string;  // register only
    password: string;
  }

  export type UpdateRequest = {
    avatar?: string;
    name?: string;
  }

  export type SearchRequest = {
    ignore_network_id?: number | undefined;
    key?: string;
  }
}
