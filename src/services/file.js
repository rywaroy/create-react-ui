import axios from '@/utils/axios';

/**
 * 获取文件目录
 */
export function getFiles() {
    return axios.get('file/display');
}

/**
 * 验证是否是js文件
 */
export function isJs(params) {
    return axios.get('file/isjs', {
        params,
    });
}

/**
 * 获取模板目录
 */
export function getTemplate() {
    return axios.get('file/template');
}

/**
 * 获取文件夹目录
 */
export function getFolder(params) {
    return axios.get('file/folder', {
        params,
    });
}

/**
 * 验证是否是js文件
 */
export function isFolder(params) {
    return axios.get('file/isfolder', {
        params,
    });
}
