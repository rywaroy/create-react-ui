import React, { useState } from 'react';
import { Input, InputNumber, AutoComplete } from 'antd';
import { mockData } from '@/types/mockData';
import styles from './index.less';

const initialValue: mockData[] = [
    { label: 'code', value: '200' },
    { label: 'count', value: 50 },
    { label: 'result', value: 'success' },
    {
        label: 'data',
        value: 'objectValue',
        objectValue: [
            {
                label: '',
                value: '',
            },
        ],
    },
];

const MockData: React.FC = () => {
    const [dataList, setDataList] = useState<mockData[]>(initialValue);

    const renderMockData = (data: mockData[]) => (
        <div className={styles.mockBlock}>
            <div className={styles.brackets}>{'{'}</div>
            {
                data.map(item => (
                    <div className={styles.mockData} key={item.label}>
                        <Input placeholder="value" value={item.label} style={{ width: '100px' }} />
                            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <InputNumber placeholder="min" value={item.labelMin} style={{ width: '60px' }} />
                            &nbsp;&nbsp;-&nbsp;&nbsp;
                        <InputNumber placeholder="max" value={item.labelMax} style={{ width: '60px' }} />
                            &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
                        <AutoComplete value={item.value} style={{ width: '100px' }} />
                        {
                            item.value === 'objectValue' && renderMockData(item.objectValue)
                        }
                    </div>
                ))
            }
            <div className={styles.brackets}>{'}'}</div>
        </div>
    );

    return (
        <div className={styles.mockBox}>

            {
                renderMockData(dataList)
            }

        </div>
    );
};

export default MockData;
