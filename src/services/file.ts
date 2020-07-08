import axios from '@/utils/axios';
import { IIsJsParams, IIsFolderParams, IIsJsOrFolderParams, IGetFolderParams, IGetFilesReturn, IGetTemplateReturn, IIsJsRetrun, IGetFolderReturn, IIsFolderRetrun, IIsJsOrFolderRetrun } from '@/types/file';

/**
 * 获取文件目录
 */
export function getFiles() {
    return axios.get<any, IGetFilesReturn>('file/display');
}

/**
 * 验证是否是js文件
 */
export function isJs(params: IIsJsParams) {
    return axios.get<any, IIsJsRetrun>('file/isjs', {
        params,
    });
}

/**
 * 获取模板目录
 */
export function getTemplate() {
    return axios.get<any, IGetTemplateReturn>('file/template');
}

/**
 * 获取文件夹目录
 */
export function getFolder(params: IGetFolderParams) {
    return axios.get<any, IGetFolderReturn>('file/folder', {
        params,
    });
}

/**
 * 验证是否是js文件
 */
export function isFolder(params: IIsFolderParams) {
    return axios.get<any, IIsFolderRetrun>('file/isfolder', {
        params,
    });
}

/**
 * 验证是否是js文件或者文件夹
 */
export function isJsOrFolder(params: IIsJsOrFolderParams) {
    return axios.get<any, IIsJsOrFolderRetrun>('file/isJsOrFolder', {
        params,
    });
}
