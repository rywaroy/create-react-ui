import cloneDeep from 'lodash/cloneDeep';
import { mockData } from '@/types/mockData';

export const valueData = [
    '@id',
    '@ctitle',
    '@cname',
    '@datetime',
    '@natural',
    '@cparagraph',
    '@county(true)',
    '@character',
    '@boolean',
    '@string',
    '@date',
    '@time',
    '@color',
    '@url',
    'arrayValue',
    'objectValue',
];

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

function getMockArrayText(dataListTree: mockData[][]) {
    const data = [];
    data[0] = getMockObjectText(dataListTree[0]);
    return data;
}

export function getMockObjectText(dataListTree: mockData[]) {
    const data = {};
    dataListTree.forEach(item => {
        if (item.label && item.value) {
            let labelText = item.label;
            if (item.labelMin) {
                labelText = `${labelText}|${item.labelMin}`;
                if (item.labelMax) {
                    labelText = `${labelText}-${item.labelMax}`;
                }
            }
            if (item.value === 'objectValue') {
                data[labelText] = getMockObjectText(item.objectValue);
            } else if (item.value === 'arrayValue') {
                data[labelText] = getMockArrayText(item.arrayValue);
            } else {
                data[labelText] = item.value;
            }
        }
    });
    return data;
}
