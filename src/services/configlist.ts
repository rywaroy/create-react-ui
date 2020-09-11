import axios from '@/utils/axios';
import { IPatchLabelParams, IDeleteLabelParams, IAddLabelParams, IChangeLabelDisplayParams, IPatchClassParams, IDeleteClassParams, IAddClassParams } from '@/types/configlist';

/**
 * 获取label配置
 */
export function getLabelConfig() {
    return axios.get('/configlist/label');
}

/**
 * 修改label配置
 */
export function patchLabelConfig(params: IPatchLabelParams) {
    return axios.patch('/configlist/label', params);
}

/**
 * 删除label配置
 */
export function delLabelConfig(params: IDeleteLabelParams) {
    return axios.delete('/configlist/label', {
        params,
    });
}

/**
 * 新增label配置
 */
export function addLabelConfig(params: IAddLabelParams) {
    return axios.post('/configlist/label', params);
}

/**
 * 展示/隐藏label
 */
export function changeLabelDisplay(params: IChangeLabelDisplayParams) {
    return axios.post('/configlist/label/display', params);
}

/**
 * 获取class配置
 */
export function getClassList(params?) {
    return axios.get('/configlist/class', {
        params,
    });
}

/**
 * 修改class配置
 */
export function patchClass(params: IPatchClassParams) {
    return axios.patch('/configlist/class', params);
}

/**
 * 删除class配置
 */
export function delClass(params: IDeleteClassParams) {
    return axios.delete('/configlist/class', {
        params,
    });
}

/**
 * 新增class配置
 */
export function addClass(params: IAddClassParams) {
    return axios.post('/configlist/class', params);
}
