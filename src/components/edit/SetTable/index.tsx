import React, { useState, useEffect } from 'react';
import { AutoComplete, Button, Switch } from 'antd';
import { getLabelConfig } from '@/services/configlist';
import { ILabelItem } from '@/types/configlist';
import { IColumn, ITableScroll } from '@/types/making';
import SetColumn from './components/SetColumn';
import styles from './index.less';

interface IProps {
    columns: IColumn[];
    scroll?: ITableScroll;
    onChange: (values: any) => void;
}

const SetTable: React.FC<IProps> = (props) => {
    const columnList = [...props.columns];
    const [columns, setColumns] = useState<IColumn[]>(columnList);
    const [column, setColumn] = useState<IColumn>({ title: '', dataIndex: '' });
    const [index, setIndex] = useState<number | null>(0);
    const [label, setLabel] = useState<ILabelItem[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [key, setKey] = useState<number>(1);
    const [scroll, setScroll] = useState<boolean>(!!props.scroll);

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
        let total = 0;
        columns.forEach(column => {
            data[column.dataIndex] = '测试数据';
            if (column.width) {
                total += column.width; // 累加width，计算scorll
            } else {
                total += 200;
            }
        });
        dataSource.push({ ...data, id: Math.random() });
        dataSource.push({ ...data, id: Math.random() });
        props.onChange({
            dataSource,
            columns,
            scroll: scroll ? { x: total } : undefined,
        });
    };

    /**
     * 添加操作
     */
    const addOpt = () => {
        setVisible(true);
        setKey(Math.random());
        setColumn({
            title: '操作',
            key: 'action',
        });
        setIndex(null);
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
        if (index === null) { // 添加操作项
            list.push(values);
        } else {
            list[index] = values;
        }
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
            <div className={styles.tableScroll}>
                滚动: <Switch checked={scroll} onChange={(checked) => { setScroll(checked); }} />
            </div>
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
