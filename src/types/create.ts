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