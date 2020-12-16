import React, { useState, useEffect } from 'react';
import { Button, Select, AutoComplete } from 'antd';
import { getLabelConfig } from '@/services/configlist';
import { ISetFormValues } from '@/types/code';
import { TYPES, mockData } from '@/utils/enum';
import { ILabelItem } from '@/types/configlist';
import SetFormItem from './components/SetFormItem';
import styles from './index.less';

interface IProps {
    propName: string;
    types: any;
    onChange: (values: any) => void;
}

const SetForm: React.FC<IProps> = (props) => {
    const { propName, types = TYPES } = props;
    const [forms, setForms] = useState<ISetFormValues[]>(props[propName]);
    const [formValue, setFormValue] = useState<ISetFormValues>({ type: '', label: '', name: '' });
    const [label, setLabel] = useState<ILabelItem[]>([]);
    const [index, setIndex] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);
    const [key, setKey] = useState<number>(1);

    /**
     * 添加
     */
    const addItem = () => {
        const list = [...forms];
        list.push({
            type: '',
            label: '',
            name: '',
        });
        setForms(list);
    };

    /**
     * 删除
     */
    const deleteItem = (index: number) => {
        const list = [...forms];
        list.splice(index, 1);
        setForms(list);
    };

    /**
     * 设置type
     */
    const setType = (value: string, index: number) => {
        const list = [...forms];
        list[index].type = value;
        setForms(list);
    };

    /**
     * 设置label
     */
    const setLabelText = (value: string, index: number) => {
        const list = [...forms];
        list[index].label = value;
        list[index].name = value;
        setForms(list);
    };

    /**
     * 编辑column
     */
    const openEdit = (index: number) => {
        setFormValue(forms[index]);
        setIndex(index);
        setVisible(true);
        setKey(Math.random());
    };

    /**
     * 关闭编辑
     */
    const closeEdit = () => {
        setVisible(false);
    };

    const editItem = (values: ISetFormValues) => {
        const list = [...forms];
        list[index] = values;
        setForms(list);
        closeEdit();
    };

    /**
     * 提交
     */
    const submit = () => {
        const dataType = ['select', 'checkboxgroup', 'radiogroup', 'checkbox', 'radio'];
        const list = forms.filter(form => {
            if (dataType.indexOf(form.type) > -1) {
                form.dataOptions = mockData;
            }
            return !!form.type;
        });
        props.onChange({
            [propName]: list,
        });
    };

    useEffect(() => {
        getLabelConfig()
            .then(res => {
                setLabel(res.data.data.list);
            });
    }, []);

    return (
        <div>
            <div className={styles.formTop}>
                <div className={styles.formTitle}>form list属性</div>
                <div>
                    <Button type="primary" icon="plus" size="small" onClick={addItem} />
                </div>
            </div>
            {
                forms.map((item, index) => (
                    <div key={index} className={styles.formItem}>
                        <Select style={{ width: '140px', marginRight: '10px' }} value={item.type} onChange={(value: string) => setType(value, index)}>
                            {types.map((item, i) => (
                                <Select.Option value={item.value} key={i}>
                                    {item.label}
                                </Select.Option>
                            ))}
                        </Select>
                        <AutoComplete
                            dataSource={label.map(item => item.name)}
                            value={item.label}
                            style={{ width: '100px', marginRight: '10px' }}
                            onChange={(value: string) => setLabelText(value, index)} />
                        <Button type="primary" style={{ marginRight: '10px' }} icon="edit" size="small" onClick={() => openEdit(index)} />
                        <Button type="primary" icon="minus" size="small" onClick={() => deleteItem(index)} />
                    </div>
                ))
            }
            <Button type="primary" size="small" onClick={submit}>提交</Button>
            <SetFormItem
                visible={visible}
                key={key}
                formValue={formValue}
                onCancel={closeEdit}
                onOk={editItem} />
        </div>
    );
};

export default SetForm;
