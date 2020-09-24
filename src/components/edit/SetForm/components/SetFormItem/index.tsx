import React, { useState, useEffect } from 'react';
import { Modal, Input, InputNumber, Form, Radio, Button, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { ISetFormValues, IFormItemLayout } from '@/types/code';
import { TYPES, ruleTypes } from '@/utils/enum';

interface IProps extends FormComponentProps {
    visible: boolean;
    formValue: ISetFormValues;
    onCancel: () => void;
    onOk: (values: ISetFormValues) => void;
}

const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const SetFormItem: React.FC<IProps> = (props) => {
    const { type, label, name, span, formItemLayout, rules } = props.formValue;
    const { getFieldDecorator } = props.form;

    const [ruleList, setRuleList] = useState(rules || []);

    const onOk = () => {
        props.form.validateFields((err, values: ISetFormValues) => {
            if (!err) {
                if (values.labelCol) {
                    values.formItemLayout = values.formItemLayout || {};
                    values.formItemLayout.labelCol = { span: values.labelCol };
                    delete values.labelCol;
                }
                if (values.wrapperCol) {
                    values.formItemLayout = values.formItemLayout || {};
                    values.formItemLayout.wrapperCol = { span: values.wrapperCol };
                    delete values.wrapperCol;
                }
                if (ruleList.length > 0) {
                    values.rules = ruleList;
                }
                props.onOk(values);
            }
        });
    };

    useEffect(() => {
        if (formItemLayout) {
            const labelCol = (formItemLayout as IFormItemLayout).labelCol ? (formItemLayout as IFormItemLayout).labelCol.span : '';
            const wrapperCol = (formItemLayout as IFormItemLayout).wrapperCol ? (formItemLayout as IFormItemLayout).wrapperCol.span : '';
            props.form.setFieldsValue({
                labelCol,
                wrapperCol,
            });
        }
    }, []);

    /**
     * 添加规则
     */
    const addRule = () => {
        const rules = [...ruleList];
        rules.push({
            rule: 'required',
            content: true,
            message: '',
            id: Math.random(),
        });
        setRuleList(rules);
    };

    /**
     * 选择规则
     */
    const rulesChange = (value: string, index: number) => {
        const rules = [...ruleList];
        rules[index].rule = value;
        if (value === 'required') {
            rules[index].content = true;
        } else {
            rules[index].content = '';
        }
        rules[index].message = '';
        setRuleList(rules);
    };

    /**
     * 修改规则内容
     */
    const contentChange = (value: number, index: number) => {
        const rules = [...ruleList];
        rules[index].content = value;
        setRuleList(rules);
    };

    /**
     * 修改规则提示
     */
    const messageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const rules = [...ruleList];
        rules[index].message = e.target.value;
        setRuleList(rules);
    };

    /**
     * 删除规则
     */
    const deleteRule = (index: number) => {
        const rules = [...ruleList];
        rules.splice(index, 1);
        setRuleList(rules);
    };

    return (
        <Modal
            title="设置"
            visible={props.visible}
            onCancel={props.onCancel}
            onOk={onOk}>
            <Form>
                <Form.Item label="类型 type" {...formLayout}>
                    {
                        getFieldDecorator('type', {
                            initialValue: type,
                            rules: [
                                { required: true, message: '请选择type' },
                            ],
                        })(
                            <Select>
                                {TYPES.map((item, i) => (
                                    <Select.Option value={item.value} key={i}>
                                        {item.label}
                                    </Select.Option>
                                ))}
                            </Select>,
                        )
                    }
                </Form.Item>
                <Form.Item label="标签 label" {...formLayout}>
                    {
                        getFieldDecorator('label', {
                            initialValue: label,
                            rules: [
                                { required: true, message: '请输入label' },
                            ],
                        })(<Input />)
                    }
                </Form.Item>
                <Form.Item label="属性 name" {...formLayout}>
                    {
                        getFieldDecorator('name', {
                            initialValue: name,
                            rules: [
                                { required: true, message: '请输入name' },
                            ],
                        })(<Input />)
                    }
                </Form.Item>
                <Form.Item label="长度 span" {...formLayout}>
                    {
                        getFieldDecorator('span', {
                            initialValue: span,
                        })(<InputNumber />)
                    }
                </Form.Item>
                <Form.Item label="labelCol" {...formLayout}>
                    {
                        getFieldDecorator('labelCol')(<InputNumber />)
                    }
                </Form.Item>
                <Form.Item label="wrapperCol" {...formLayout}>
                    {
                        getFieldDecorator('wrapperCol')(<InputNumber />)
                    }
                </Form.Item>
                <Form.Item
                    {...formLayout}
                    label={(
                        <span>
                        规则 rules
                            {' '}
                            <Button type="primary" icon="plus" size="small" onClick={addRule} />
                        </span>
                    )}>
                    {
                        ruleList.map((item, index) => (
                            <div key={item.id} style={{ border: '1px solid #ccc', padding: '5px 10px', borderRadius: 8, marginBottom: 5 }}>
                                <Select style={{ width: 100, marginRight: 10 }} value={item.rule} onChange={(value: string) => rulesChange(value, index)}>
                                    {ruleTypes.map((rule, r) => (
                                        <Select.Option value={rule} key={r}>
                                            {rule}
                                        </Select.Option>
                                    ))}
                                </Select>
                                {
                                    (item.rule === 'len' || item.rule === 'max' || item.rule === 'min')
                                    && <InputNumber style={{ marginRight: 10 }} onChange={value => contentChange(value, index)} value={item.content as number} />
                                }
                                <Button type="primary" icon="close" size="small" onClick={() => deleteRule(index)} />
                                <Input placeholder="message" onChange={e => messageChange(e, index)} value={item.message} />
                            </div>
                        ))
                    }
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Form.create<IProps>()(SetFormItem);
