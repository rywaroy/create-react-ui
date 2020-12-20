import axios from '@/utils/axios';
import { mockObject } from '@/types/mockData';

/**
 * 创建mock
 */
export function createMock(params: mockObject) {
    return axios.post('mockData/createMock', params);
}
