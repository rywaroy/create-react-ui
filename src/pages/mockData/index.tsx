import React, { useState } from 'react';
import { mockData } from '@/types/mock';
import styles from './index.less';

const initialValue: mockData[] = [
    { label: 'code', value: '200' },
    { label: 'count', value: 50 },
    { label: 'result', value: 'success' },
];

const MockData: React.FC = () => {
    const [dataList, setDataList] = useState<mockData[]>(initialValue);
    return (
        <div className={styles.mockBox}>
            <div className={styles.brackets}>{'{'}</div>
            <div className={styles.brackets}>{'}'}</div>
        </div>
    );
};

export default MockData;
