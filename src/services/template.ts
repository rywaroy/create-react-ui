import axios from '@/utils/axios';
import { IDefaultFormValues, IUmiFormValues, ICustomFormValues } from '@/types/template';

/**
 * 创建默认模板
 */
export function createDefaultTemplate(params: IDefaultFormValues) {
    return axios.get('template/default', {
        params,
    });
}

/**
 * 创建umi模板
 */
export function createUmiTemplate(params: IUmiFormValues) {
    return axios.get('template/umi', {
        params,
    });
}

/**
 * 创建自定义模板
 */
export function createCustomTemplate(params: ICustomFormValues) {
    return axios.get('template/custom', {
        params,
    });
}
