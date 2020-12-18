import React from 'react';
import { Input, InputNumber, AutoComplete, Button } from 'antd';
import { mockData } from '@/types/mockData';
import useChangeMock from './hooks/useChangeMock';
import useEditMock from './hooks/useEditMock';
import useCreateMock from './hooks/useCreateMock';
import { valueData } from './map';
import styles from './index.less';

const MockData: React.FC = () => {
    // 修改mock对象逻辑
    const {
        dataList,
        dataListTree,
        mockObject,
        mockResult,
        setDataList,
        onChangeLabel,
        onChangeLabelMin,
        onChangeLabelMax,
        onChangeValue,
    } = useChangeMock();

    // 添加/删除mock对象逻辑
    const { addItem, deleteItem } = useEditMock(dataList, setDataList);

    // 打开生成mock弹窗
    const { toggle, modalProps } = useCreateMock();

    /**
     * 渲染单条mock数据
     */
    const renderMockItem = (item: mockData, index: number) => (
        <div className={styles.mockData} key={item.id}>
            <Input placeholder="value" value={item.label} style={{ width: '100px' }} onChange={e => onChangeLabel(e.target.value, item.id)} />
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <InputNumber placeholder="min" value={item.labelMin} style={{ width: '60px' }} onChange={value => onChangeLabelMin(value, item.id)} min={1} />
                &nbsp;&nbsp;-&nbsp;&nbsp;
            <InputNumber placeholder="max" value={item.labelMax} style={{ width: '60px' }} onChange={value => onChangeLabelMax(value, item.id)} min={1} />
                &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
            <AutoComplete
                value={item.value}
                style={{ width: '100px', marginRight: '10px' }}
                dataSource={valueData}
                onChange={(value: string) => onChangeValue(value, item.id)} />
            {
                index > 0 && <Button type="primary" icon="minus" size="small" onClick={() => deleteItem(item.id)} />
            }
            {
                item.value === 'objectValue' && renderObjectMockData(item.objectValue, item.id)
            }
            {
                item.value === 'arrayValue' && renderArrayMockData(item.arrayValue)
            }
        </div>
    );

    /**
     * 渲染对象mock数据
     */
    const renderObjectMockData = (data: mockData[], index: number) => (
        <div className={styles.mockBlock} key={index}>
            <div className={styles.brackets}>{'{'} <Button type="primary" size="small" icon="plus" onClick={() => addItem(data)} /></div>
            {
                data.map((item, index) => renderMockItem(item, index))
            }
            <div className={styles.brackets}>{'}'}</div>
        </div>
    );

    /**
     * 渲染数组mock数据
     */
    const renderArrayMockData = (data: mockData[][]) => (
        <div className={styles.mockBlock}>
            <div className={styles.brackets}>[</div>
            {
                data.map((item, index) => renderObjectMockData(item, index))
            }
            <div className={styles.brackets}>]</div>
        </div>
    );

    return (
        <div className={styles.mockWrap}>
            <Button type="primary">生成mock</Button>
            <div className={styles.mockBox}>
                <div className={styles.mockTree}>
                    {renderObjectMockData(dataListTree, 1)}
                </div>
                <div className={styles.mockCode}>
                    mock 对象
                    <pre>
                        {JSON.stringify(mockObject, null, 2)}
                    </pre>
                </div>
                <div className={styles.mockCode}>
                    mock 数据
                    <pre>
                        {JSON.stringify(mockResult, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default MockData;
