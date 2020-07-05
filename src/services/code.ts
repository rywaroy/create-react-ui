import axios from '@/utils/axios';
import { IFormCode, ITableCodeParams, IListPage } from '@/types/code';

/**
 * 创建表格代码块
 */
export function createTableCode(params: ITableCodeParams) {
    return axios.post('code/table', params);
}

/**
 * 创建表单代码块
 */
export function createFormCode(params: IFormCode) {
    return axios.post('code/form', params);
}

/**
 * 创建页面代码
 */
export function createListPage(params: IListPage) {
    return axios.post('code/listpage', params);
}
