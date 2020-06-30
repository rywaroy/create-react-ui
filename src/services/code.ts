import axios from '@/utils/axios';
import { IFormCode, ITableCode } from '@/types/code';

/**
 * 创建表格代码块
 */
export function createTableCode(params: ITableCode) {
    return axios.post('code/table', params);
}

/**
 * 创建表单代码块
 */
export function createFormCode(params: IFormCode) {
    return axios.post('code/form', params);
}
