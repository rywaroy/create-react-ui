import axios from '@/utils/axios';

/**
 * 获取label配置
 */
export function getLabelConfig(params) {
    return axios.get('/configlist/label', {
        params,
    });
}

/**
 * 修改label配置
 */
export function patchLabelConfig(params) {
    return axios.patch('/configlist/label', params);
}
