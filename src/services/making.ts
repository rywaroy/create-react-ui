import axios from '@/utils/axios';

/**
 * 获取page列表
 */
export function getPageList() {
    return axios.get('making/page');
}
