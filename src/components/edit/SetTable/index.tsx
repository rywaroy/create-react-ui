import React, { useState, useEffect } from 'react';
import { AutoComplete, Button } from 'antd';
import { getLabelConfig } from '@/services/configlist';
import { ILabelItem } from '@/types/configlist';
import { IColumn } from '@/types/making';
import SetColumn from './components/SetColumn';
import styles from './index.less';

interface IProps {
    columns: IColumn[];
    onChange: (values: any) => void;
}

const ACTION_KEY = 'action';

const SetTable: React.FC<IProps> = (props) => {
    const columnList = [...props.columns];
    const [columns, setColumns] = useState<IColumn[]>(columnList);
    const [column, setColumn] = useState<IColumn>({ title: '', dataIndex: '' });
    const [index, setIndex] = useState<number | null>(0);
    const [label, setLabel] = useState<ILabelItem[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [key, setKey] = useState<number>(1);

    useEffect(() => {
        getLabelConfig()
            .then(res => {
                setLabel(res.data.data.list);
            });
    }, []);

    /**
     * 添加
     */
    const addColumn = () => {
        const list = [...columns];
        list.push({
            title: `属性${list.length + 1}`,
            dataIndex: `属性${list.length + 1}`,
        });
        setColumns(list);
    };

    /**
     * 修改
     */
    const changeColumn = (value: string, index: number) => {
        const list = [...columns];
        list[index].title = value;
        list[index].dataIndex = value;
        setColumns(list);
    };

    /**
     * 删除
     */
    const deleteColumn = (index: number) => {
        const list = [...columns];
        list.splice(index, 1);
        setColumns(list);
    };

    /**
     * 提交
     */
    const submit = () => {
        const dataSource = [];
        const data: any = {};
        columns.forEach(column => {
            data[column.dataIndex] = '测试数据';
        });
        dataSource.push({ ...data, id: Math.random() });
        dataSource.push({ ...data, id: Math.random() });
        props.onChange({
            dataSource,
            columns,
        });
    };

    /**
     * 添加操作
     */
    const addOpt = () => {
        setVisible(true);
        setKey(Math.random());
    };

    /**
     * 编辑column
     */
    const openColumn = (index: number) => {
        setColumn(columns[index]);
        setIndex(index);
        setVisible(true);
        setKey(Math.random());
    };

    /**
     * 关闭编辑
     */
    const closeColumn = () => {
        setVisible(false);
    };

    /**
     * 编辑
     */
    const editColumn = (values: IColumn) => {
        const list = [...columns];
        list[index] = values;
        setColumns(list);
        closeColumn();
    };

    return (
        <div>
            <div className={styles.tableTop}>
                <div className={styles.tableTitle}>table属性</div>
                <div>
                    <Button type="primary" size="small" style={{ marginRight: '10px' }} onClick={() => addOpt()}>添加操作</Button>
                    <Button type="primary" icon="plus" size="small" onClick={() => addColumn()} />
                </div>
            </div>
            {
                columns.map((colum, index) => (
                    <div className={styles.tableItem} key={index}>
                        <AutoComplete
                            dataSource={label.map(item => item.name)}
                            value={colum.title}
                            style={{ width: '150px', marginRight: '10px' }}
                            onChange={(value: string) => changeColumn(value, index)} />
                        <Button type="primary" style={{ marginRight: '10px' }} icon="edit" size="small" onClick={() => openColumn(index)} />
                        <Button type="primary" icon="minus" size="small" onClick={() => deleteColumn(index)} />
                    </div>
                ))
            }
            <Button type="primary" size="small" onClick={() => submit()}>提交</Button>
            <SetColumn
                visible={visible}
                column={column}
                key={key}
                onCancel={closeColumn}
                onOk={editColumn} />
        </div>
    );
};

export default SetTable;
