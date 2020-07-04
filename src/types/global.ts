export interface AxiosResponseReturn<T> {
  data: AxiosResponseData<T>;
}

export interface AxiosResponseData<T> {
  data: T;
  status: number;
  message?: string;
}
