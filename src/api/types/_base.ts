export type Response<T> = {
  code: number;
  msg: string
  data: T;
}

export type ResponseListData<T> = {
  list: T[];
  total: number;
  page: number;
  page_size: number;
}

export type PageRequest = {
  page?: number;
  page_size?: number;
}
