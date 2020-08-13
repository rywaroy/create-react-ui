import { AxiosResponseReturn } from '@/types/global';

export interface IConfigOption {
  name: string;
  value: string;
}

interface IGetListReturnData {
  list: IConfigOption[];
  isEmpty: boolean;
}

export type IGetListReturn  = AxiosResponseReturn<IGetListReturnData>

export interface ICreateProjectParams {
  list: string[];
  project?: string;
}

export interface IGetListParams {
  project?: string;
}