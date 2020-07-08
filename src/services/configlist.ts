import axios from '@/utils/axios';
import { IPatchLabelParams, IDeleteLabelParams, IAddLabelParams, IChangeLabelDisplayParams } from '@/types/configlist';

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
