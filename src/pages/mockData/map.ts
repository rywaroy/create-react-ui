import cloneDeep from 'lodash/cloneDeep';
import { mockData } from '@/types/mockData';

export function getDataTree(dataList: mockData[]) {
    const result: mockData[] = [];
    const data = cloneDeep<mockData[]>(dataList);
    const hash: {
        [props: number]: mockData
    } = {};
    data.forEach((_, index) => {
        hash[data[index].id] = data[index];
    });
    data.forEach((item) => {
        const hashVP = hash[item.pid];
        if (hashVP) {
            if (hashVP.value === 'objectValue') {
                if (hashVP.objectValue) {
                    hashVP.objectValue.push(item);
                } else {
                    hashVP.objectValue = [item];
                }
            }

            if (hashVP.value === 'arrayValue') {
                if (hashVP.arrayValue) {
                    hashVP.arrayValue[0].push(item);
                } else {
                    hashVP.arrayValue = [[item]];
                }
            }
        } else {
            result.push(item);
        }
    });
    return result;
}
