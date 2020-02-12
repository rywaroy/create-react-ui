import axios from '@/utils/axios';

export function getFiles() {
    return axios.get('file/display');
}