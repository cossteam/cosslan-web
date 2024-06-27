export namespace Response {
  export type Base<T> = {
    code: number;
    msg: string
    data: T;
  }
  export type List<T> = {
    list: T[];
    total: number;
  }

  export type ListData<T> = &List<T> & {
    page: number;
    page_size: number;
  }
}

export namespace Request {
  export type Page = {
    page?: number;
    page_size?: number;
  }
}
