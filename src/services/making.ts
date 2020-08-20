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
