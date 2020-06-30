import React, { Component } from 'react';
import { Modal, Select, Input, Form, Radio, InputNumber, Button } from 'antd';
import { TYPES, initialValueOptions, formItemLayoutOptions, ruleTypes, mockData } from '@/utils/enum';
import { FormComponentProps } from 'antd/es/form';
import { RadioChangeEvent } from 'antd/es/radio';
import { IFormItem } from '@/types/code';

const { Option } = Select;

interface IRule {
    rule: string;
    content: string | boolean | number;
    message: string;
    id: number;
  }

interface IState {
    showCol: boolean;
    rules: IRule[];
}

interface IProps extends FormComponentProps {
    onOk: (obj: IFormItem) => void;
    onCancel: () => void;
    isFilterForm: boolean;
    visibleSetForm: boolean;
}

class SetForm extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            showCol: false,
            rules: [],
        };
    }

    setForm = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { type, label, initialValue, span, formItemLayout, labelCol, wrapperCol } = values;
                const obj: IFormItem = {
                    type,
                    label,
                    name: label,
                };
                if (initialValue) obj.initialValue = '';
                if (span) obj.span = span;
                if (formItemLayout === '数值') {
                    obj.formItemLayout = {
                        labelCol: { span: labelCol },
                        wrapperCol: { span: wrapperCol },
                    };
                }
                if (formItemLayout === '变量') {
                    obj.formItemLayoutText = 'formItemLayout';
                }
                if (this.state.rules.length > 0) {
                    obj.rules = this.state.rules.map(item => ({
                        [item.rule]: item.content,
                        message: item.message,
                    }));
                }
                if (type === 'select') {
                    obj.selectOptions = mockData;
                }
                if (type === 'checkboxgroup') {
                    obj.checkboxOptions = mockData;
                }
                if (type === 'radiogroup') {
                    obj.radioOptions = mockData;
                }
                this.props.onOk(obj);
            }
        });
    }

    /**
     * 关闭配置表单弹窗
     */
    closeSetForm = () => {
        this.props.onCancel();
    }

    /**
     * 切换layout
     */
    layoutChange = (e: RadioChangeEvent) => {
        let showCol = false;
        if (e.target.value === '数值') {
            showCol = true;
        }
        this.setState({
            showCol,
        });
    }

    /**
     * 添加规则
     */
    addRule = () => {
        const rules = [...this.state.rules];
        rules.push({
            rule: 'required',
            content: true,
            message: '',
            id: Math.random(),
        });
        this.setState({
            rules,
        });
    }

    /**
     * 选择规则
     */
    rulesChange = (value: string, index: number) => {
        const rules = [...this.state.rules];
        rules[index].rule = value;
        if (value === 'required') {
            rules[index].content = true;
        } else {
            rules[index].content = '';
        }
        rules[index].message = '';
        this.setState({
            rules,
        });
    }

    /**
     * 删除规则
     */
    deleteRule = (index: number) => {
        const rules = [...this.state.rules];
        rules.splice(index, 1);
        this.setState({
            rules,
        });
    }

    /**
     * 修改规则内容
     */
    contentChange = (value: number, index: number) => {
        const rules = [...this.state.rules];
        rules[index].content = value;
        this.setState({
            rules,
        });
    }

    /**
     * 修改规则提示
     */
    messageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const rules = [...this.state.rules];
        rules[index].message = e.target.value;
        this.setState({
            rules,
        });
    }

    render() {
        const { visibleSetForm, isFilterForm } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
        };
        const { showCol, rules } = this.state;

        return (
            <Modal
                title="设置"
                visible={visibleSetForm}
                onOk={this.setForm}
                onCancel={this.closeSetForm}
                zIndex={1003}
            >
                <Form {...formItemLayout}>
                    <Form.Item label="类型 type">
                        {getFieldDecorator('type', {
                            initialValue: 'input',
                        })(
                            <Select>
                                {TYPES.map((item, index) => (
                                    <Option value={item.value} key={index}>
                                        {item.label}
                                    </Option>
                                ))}
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="标签 label">
                        {getFieldDecorator('label', {
                            rules: [
                                { required: true, message: '请输入标签' },
                            ],
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item label="默认值 initialValue">
                        {getFieldDecorator('initialValue', {
                            initialValue: false,
                        })(
                            <Radio.Group options={initialValueOptions} />,
                        )}
                    </Form.Item>
                    {
                        !isFilterForm
                        && (
                            <Form.Item label="长度 span">
                                {getFieldDecorator('span')(
                                    <InputNumber />,
                                )}
                            </Form.Item>
                        )
                    }

                    {
                        !isFilterForm
                        && (
                            <Form.Item label="布局 formItemLayout">
                                {getFieldDecorator('formItemLayout', {
                                    initialValue: false,
                                })(
                                    <Radio.Group options={formItemLayoutOptions} onChange={this.layoutChange} />,
                                )}
                            </Form.Item>
                        )
                    }

                    {
                        showCol
                        && (
                            <Form.Item label="labelCol">
                                {getFieldDecorator('labelCol', {
                                    rules: [
                                        { required: true, message: '请输入标签' },
                                    ],
                                })(
                                    <InputNumber />,
                                )}
                            </Form.Item>
                        )
                    }
                    {
                        showCol
                        && (
                            <Form.Item label="wrapperCol">
                                {getFieldDecorator('wrapperCol', {
                                    rules: [
                                        { required: true, message: '请输入标签' },
                                    ],
                                })(
                                    <InputNumber />,
                                )}
                            </Form.Item>
                        )
                    }
                    {
                        !isFilterForm
                        && (
                            <Form.Item label={(
                                <span>
                                    规则 rules
                                    {' '}
                                    <Button type="primary" icon="plus" size="small" onClick={this.addRule} />
                                </span>
                            )}>
                                {
                                    rules.map((item, index) => (
                                        <div key={item.id} style={{ border: '1px solid #ccc', padding: '5px 10px', borderRadius: 8, marginBottom: 5 }}>
                                            <Select style={{ width: 100, marginRight: 10 }} value={item.rule} onChange={(value: string) => this.rulesChange(value, index)}>
                                                {ruleTypes.map((rule, r) => (
                                                    <Option value={rule} key={r}>
                                                        {rule}
                                                    </Option>
                                                ))}
                                            </Select>
                                            {
                                                (item.rule === 'len' || item.rule === 'max' || item.rule === 'min')
                                                && <InputNumber style={{ marginRight: 10 }} onChange={value => this.contentChange(value, index)} />
                                            }
                                            <Button type="primary" icon="close" size="small" onClick={() => this.deleteRule(index)} />
                                            <Input placeholder="message" onChange={e => this.messageChange(e, index)} />
                                        </div>
                                    ))
                                }
                            </Form.Item>
                        )

                    }
                </Form>
            </Modal>
        );
    }
}

const SetFormForm = Form.create<IProps>({ name: 'set_form' })(SetForm);

export default SetFormForm;
