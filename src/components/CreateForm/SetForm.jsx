import React, { Component } from 'react';
import { Modal, Select, Input, Form, Radio, InputNumber, Button } from 'antd';

const { Option } = Select;

const TYPES = [
    { value: 'label', label: '文字 label' },
    { value: 'input', label: '输入框 input' },
    { value: 'select', label: '选择框 select' },
    { value: 'inputnumber', label: '数字输入框 inputnumber' },
    { value: 'password', label: '密码框 password' },
    { value: 'datepicker', label: '日期选择框 datepicker' },
    { value: 'monthpicker', label: '月份选择框 monthpicker' },
    { value: 'rangepicker', label: '时间区间选择框 rangepicker' },
    // { value: 'checkbox', label: '多选 checkbox' },
    { value: 'checkboxgroup', label: '输入框组 checkboxgroup' },
    { value: 'textarea', label: '文本框 textarea' },
    { value: 'radiogroup', label: '单选组 radiogroup' },
];

const initialValueOptions = [
    { label: 'false', value: false },
    { label: 'true', value: true },
];

const colonOptions = [
    { label: 'true', value: true },
    { label: 'false', value: false },
];

const addonAfterOptions = [
    { label: 'false', value: false },
    { label: 'true', value: true },
];

const formItemLayoutOptions = [
    { label: 'false', value: false },
    { label: '变量', value: '变量' },
    { label: '数值', value: '数值' },
];

const ruleTypes = ['required', 'max', 'min', 'len'];

const mockData = [
    { value: '测试数据1', label: '测试数据1' },
    { value: '测试数据2', label: '测试数据2' },
    { value: '测试数据3', label: '测试数据3' },
];

class SetForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCol: false,
            rules: [],
        };
        if (this.props.disableFormItemLayout) {
            formItemLayoutOptions.forEach(item => { item.disabled = true; });
        }
    }

    setForm = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { type, label, initialValue, colClass, colon, addonAfter, span, formItemLayout, labelCol, wrapperCol } = values;
                const obj = {
                    type,
                    label,
                    name: label,
                };
                if (initialValue) obj.initialValue = '';
                if (colClass) obj.colClass = colClass;
                if (!colon) obj.colon = false;
                if (addonAfter) obj.addonAfter = '';
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
     *
     */
    layoutChange = e => {
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
    rulesChange = (value, index) => {
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
    deleteRule = index => {
        const rules = [...this.state.rules];
        rules.splice(index, 1);
        this.setState({
            rules,
        });
    }

    /**
     * 修改规则内容
     */
    contentChange = (value, index) => {
        const rules = [...this.state.rules];
        rules[index].content = value;
        this.setState({
            rules,
        });
    }

    /**
     * 修改规则提示
     */
    messageChange = (e, index) => {
        const rules = [...this.state.rules];
        rules[index].message = e.target.value;
        this.setState({
            rules,
        });
    }


    render() {
        const { visibleSetForm } = this.props;
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
                zIndex="1003"
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
                    <Form.Item label="自定义类 colClass">
                        {getFieldDecorator('colClass')(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item label="冒号 colon">
                        {getFieldDecorator('colon', {
                            initialValue: true,
                        })(
                            <Radio.Group options={colonOptions} />,
                        )}
                    </Form.Item>
                    <Form.Item label="后缀 addonAfter">
                        {getFieldDecorator('addonAfter', {
                            initialValue: false,
                        })(
                            <Radio.Group options={addonAfterOptions} />,
                        )}
                    </Form.Item>
                    <Form.Item label="长度 span">
                        {getFieldDecorator('span')(
                            <InputNumber />,
                        )}
                    </Form.Item>
                    <Form.Item label="布局 formItemLayout">
                        {getFieldDecorator('formItemLayout', {
                            initialValue: false,
                        })(
                            <Radio.Group options={formItemLayoutOptions} onChange={this.layoutChange} />,
                        )}
                    </Form.Item>
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
                                    <Select style={{ width: 100, marginRight: 10 }} value={item.rule} onChange={value => this.rulesChange(value, index)}>
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
                </Form>
            </Modal>
        );
    }
}

const SetFormForm = Form.create({ name: 'set_form' })(SetForm);

export default SetFormForm;
