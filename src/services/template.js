import axios from '@/utils/axios';

/**
 * 创建默认模板
 */
export function createDefaultTemplate(params) {
    return axios.get('template/default', {
        params,
    });
}

/**
 * 创建umi模板
 */
export function createUmiTemplate(params) {
    return axios.get('template/umi', {
        params,
    });
}

/**
 * 创建自定义模板
 */
export function createCustomTemplate(params) {
    return axios.get('template/custom', {
        params,
    });
}
