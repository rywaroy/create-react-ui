import axios from '@/utils/axios';

/**
 * 创建表格代码块
 */
export function createTableCode(params) {
    return axios.post('code/table', params);
}

/**
 * 创建表单代码块
 */
export function createFormCode(params) {
    return axios.post('code/form', params);
}
