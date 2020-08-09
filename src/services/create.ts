import axios from '@/utils/axios';
import { IGetListReturn, ICreateProjectParams } from '@/types/create';

/**
 * 获取
 */
export function getList() {
    return axios.get<any, IGetListReturn>('create/list');
}

/**
 * 创建
 */
export function createProject(params: ICreateProjectParams) {
    return axios.post('create/create', params);
}
