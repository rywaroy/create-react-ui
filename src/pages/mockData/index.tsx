import React, { useState, useCallback } from 'react';
import { Input, InputNumber, AutoComplete } from 'antd';
import { mockData } from '@/types/mockData';
import { getDataTree } from './map';
import styles from './index.less';

const initialValue: mockData[] = [
    { label: 'code', value: '200', id: 2, pid: 1 },
    { label: 'count', value: '50', id: 3, pid: 1 },
    { label: 'result', value: 'success', id: 4, pid: 1 },
    { label: 'data', value: 'arrayValue', id: 5, pid: 1 },
    { label: '', value: '', id: 6, pid: 5 },
];

const MockData: React.FC = () => {
    const [dataList, setDataList] = useState<mockData[]>(initialValue);

    const list = getDataTree(dataList);

    const onChangeLabel = (text: string, id: number) => {
        const list = [...dataList];
        list.forEach(item => {
            if (item.id === id) {
                item.label = text;
            }
        });
        setDataList(list);
    };

    /**
     * 渲染单条mock数据
     */
    const renderMockItem = useCallback((item: mockData) => (
        <div className={styles.mockData} key={item.id}>
            <Input placeholder="value" value={item.label} style={{ width: '100px' }} onChange={e => onChangeLabel(e.target.value, item.id)} />
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <InputNumber placeholder="min" value={item.labelMin} style={{ width: '60px' }} />
                &nbsp;&nbsp;-&nbsp;&nbsp;
            <InputNumber placeholder="max" value={item.labelMax} style={{ width: '60px' }} />
                &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
            <AutoComplete value={item.value} style={{ width: '100px' }} />
            {
                item.value === 'objectValue' && renderObjectMockData(item.objectValue, item.id)
            }
            {
                item.value === 'arrayValue' && renderArrayMockData(item.arrayValue)
            }
        </div>
    ), []);

    /**
     * 渲染对象mock数据
     */
    const renderObjectMockData = useCallback((data: mockData[], index: number) => (
        <div className={styles.mockBlock} key={index}>
            <div className={styles.brackets}>{'{'}</div>
            {
                data.map((item) => renderMockItem(item))
            }
            <div className={styles.brackets}>{'}'}</div>
        </div>
    ), []);

    /**
     * 渲染数组mock数据
     */
    const renderArrayMockData = useCallback((data: mockData[][]) => (
        <div className={styles.mockBlock}>
            <div className={styles.brackets}>[</div>
            {
                data.map((item, index) => renderObjectMockData(item, index))
            }
            <div className={styles.brackets}>]</div>
        </div>
    ), []);

    return (
        <div className={styles.mockBox}>
            {renderObjectMockData(list, 1)}
        </div>
    );
};

export default MockData;
