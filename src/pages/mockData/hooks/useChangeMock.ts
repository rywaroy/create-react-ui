import { useState, useEffect } from 'react';
import { useDebounceEffect } from 'ahooks';
import Mock from 'mockjs';
import { mockData } from '@/types/mockData';
import { getDataTree, getMockObjectText } from '../map';

const initialValue: mockData[] = [
    { label: 'code', value: '200', id: 2, pid: 1 },
    { label: 'count', value: '50', id: 3, pid: 1 },
    { label: 'result', value: 'success', id: 4, pid: 1 },
    { label: 'data', value: 'arrayValue', id: 5, pid: 1 },
    { label: '', value: '', id: 6, pid: 5 },
];

export default function useChangeMock() {
    const [dataList, setDataList] = useState<mockData[]>(initialValue);
    const [dataListTree, setDataListTree] = useState<mockData[]>([]);
    const [mockObject, setMockObject] = useState<Object>({});
    const [mockResult, setMockResult] = useState<Object>({});

    const onChangeLabel = (text: string, id: number) => {
        const list = [...dataList];
        list.forEach(item => {
            if (item.id === id) {
                item.label = text;
            }
        });
        setDataList(list);
    };

    const onChangeLabelMin = (text: number, id: number) => {
        const list = [...dataList];
        list.forEach(item => {
            if (item.id === id) {
                item.labelMin = text;
            }
        });
        setDataList(list);
    };

    const onChangeLabelMax = (text: number, id: number) => {
        const list = [...dataList];
        list.forEach(item => {
            if (item.id === id) {
                item.labelMax = text;
            }
        });
        setDataList(list);
    };

    const onChangeValue = (text: string, id: number) => {
        const list = [...dataList];
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                list[i].value = text;
                break;
            }
        }
        if (text === 'objectValue') {
            list.push({ label: '', value: '', id: Math.random(), pid: id });
        } else if (text === 'arrayValue') {
            list.push({ label: '', value: '', id: Math.random(), pid: id });
        } else {
            // 清空子项
            for (let i = list.length - 1; i >= 0; i--) {
                if (list[i].pid === id) {
                    list.splice(i, 1);
                }
            }
        }
        setDataList(list);
    };

    useEffect(() => {
        setDataListTree(getDataTree(dataList));
    }, [dataList]);

    useDebounceEffect(() => {
        const text = getMockObjectText(dataListTree);
        setMockObject(text);
        setMockResult(Mock.mock(text));
    }, [dataListTree]);

    return {
        dataList,
        dataListTree,
        mockObject,
        mockResult,
        setDataList,
        onChangeLabel,
        onChangeLabelMin,
        onChangeLabelMax,
        onChangeValue,
    };
}
