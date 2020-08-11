import axios from '@/utils/axios';
import { IGetListReturn, ICreateProjectParams, IGetListParams } from '@/types/create';

/**
 * 获取
 */
export function getList(params?: IGetListParams) {
    return axios.get<any, IGetListReturn>('create/list', {
        params,
    });
}

/**
 * 创建
 */
export function createProject(params: ICreateProjectParams) {
    return axios.post('create/create', params);
}
