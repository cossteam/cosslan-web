export namespace UserNotification {
  export type Info = {
    id?: number
    network_id?: number
    network_name?: string
    network_ip_range?: string
    user_id?: number
    send_id?: number
    send_name?: string
    send_email?: string
    type?: string
    title?: string
    content?: {
      [key: string]: any
    };
    read_at?: string
    created_at?: string
    updated_at?: string
  }
}
