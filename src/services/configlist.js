import axios from '@/utils/axios';

/**
 * 获取label配置
 */
export function getLabelConfig(params) {
    return axios.get('/configlist/label', {
        params,
    });
}
