import React, { useState, useCallback } from 'react';
import { Input, InputNumber, AutoComplete } from 'antd';
import { mockData } from '@/types/mockData';
import styles from './index.less';

const initialValue: mockData[] = [
    { label: 'code', value: '200' },
    { label: 'count', value: 50 },
    { label: 'result', value: 'success' },
    {
        label: 'data',
        value: 'arrayValue',
        arrayValue: [
            [{
                label: '',
                value: '',
            }],
        ],
    },
];

const MockData: React.FC = () => {
    const [dataList, setDataList] = useState<mockData[]>(initialValue);

    /**
     * 渲染单条mock数据
     */
    const renderMockItem = useCallback((item: mockData) => (
        <div className={styles.mockData} key={item.label}>
            <Input placeholder="value" value={item.label} style={{ width: '100px' }} />
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <InputNumber placeholder="min" value={item.labelMin} style={{ width: '60px' }} />
                &nbsp;&nbsp;-&nbsp;&nbsp;
            <InputNumber placeholder="max" value={item.labelMax} style={{ width: '60px' }} />
                &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
            <AutoComplete value={item.value} style={{ width: '100px' }} />
            {
                item.value === 'objectValue' && renderObjectMockData(item.objectValue)
            }
            {
                item.value === 'arrayValue' && renderArrayMockData(item.arrayValue)
            }
        </div>
    ), []);

    /**
     * 渲染对象mock数据
     */
    const renderObjectMockData = useCallback((data: mockData[]) => (
        <div className={styles.mockBlock}>
            <div className={styles.brackets}>{'{'}</div>
            {
                data.map(item => renderMockItem(item))
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
                data.map(item => renderObjectMockData(item))
            }
            <div className={styles.brackets}>]</div>
        </div>
    ), []);

    return (
        <div className={styles.mockBox}>
            {renderObjectMockData(dataList)}
        </div>
    );
};

export default MockData;
