import axios from '@/utils/axios';

/**
 * 创建表格代码块
 */
export function createTableCode(params) {
    return axios.get('code/table', {
        params
    });
}