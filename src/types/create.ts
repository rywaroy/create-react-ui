import { AxiosResponseReturn } from '@/types/global';

export interface IConfigOption {
  name: string;
  value: string;
}

export type IGetListReturn  = AxiosResponseReturn<IConfigOption[]>