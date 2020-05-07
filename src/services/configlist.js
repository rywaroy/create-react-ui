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

/**
 * 删除label配置
 */
export function delLabelConfig(params) {
    return axios.delete('/configlist/label', {
        params,
    });
}

/**
 * 新增label配置
 */
export function addLabelConfig(params) {
    return axios.post('/configlist/label', params);
}

/**
 * 展示/隐藏label
 */
export function changeLabelDisplay(params) {
    return axios.post('/configlist/label/display', params);
}
