import axios from '@/utils/axios';
import { mockDataParams } from '@/types/mockData';

/**
 * 创建mock
 */
export function createMock(params: mockDataParams) {
    return axios.post('mockData/createMock', params);
}
