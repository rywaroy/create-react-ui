import axios from '@/utils/axios';

/**
 * 获取文件目录
 */
export function getFiles() {
    return axios.get('file/display');
}