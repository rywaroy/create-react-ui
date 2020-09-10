import axios from '@/utils/axios';

/**
 * 获取page列表
 */
export function getPageList() {
    return axios.get('making/page');
}

/**
 * 添加page列表
 */
export function addPageList(params) {
    return axios.post('making/page', params);
}

/**
 * 删除page列表
 */
export function delPageList(params) {
    return axios.delete('making/page', {
        params,
    });
}

/**
 * 预览代码
 */
export function preview(params) {
    return axios.post('making/preview', params);
}

/**
 * 生成代码
 */
export function create(params) {
    return axios.post('making/create', params);
}
