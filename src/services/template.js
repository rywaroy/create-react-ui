import axios from '@/utils/axios';

/**
 * 创建默认模板
 */
export function createDefaultTemplate(params) {
    return axios.get('template/default', {
        params
    });
}