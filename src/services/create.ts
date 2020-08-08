import axios from '@/utils/axios';
import { IGetListReturn } from '@/types/create';

/**
 * 获取
 */
export function getList() {
    return axios.get<any, IGetListReturn>('create/list');
}
