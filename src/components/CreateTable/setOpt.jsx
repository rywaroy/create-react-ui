import React, { Component } from 'react';
import { Modal, InputNumber, Input, Form, Radio, Button } from 'antd';

const fixedOptions = [
    { label: 'false', value: false },
    { label: 'right', value: 'right' },
    { label: 'left', value: 'left' },
];

const linkOptions = [
    { label: 'false', value: false },
    { label: 'true', value: true },
];

class SetOpt extends Component {
    state = {
        opts: [],
    }

    setOpt = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const res = this.state.opts.every(item => item.text);
                if (!res) {
                    return;
                }
                values.opts = this.state.opts;
                this.props.onOk(values);
            }
        });
    }

    closeOpt = () => {
        this.props.onCancel();
    }

    addOpt = () => {
        const opts = [...this.state.opts];
        opts.push({
            text: '',
            link: false,
        });
        this.setState({
            opts,
        });
    }

    optInputChange(e, index) {
        const opts = [...this.state.opts];
        opts[index].text = e.target.value;
        this.setState({
            opts,
        });
    }

    optRadioChange(e, index) {
        const opts = [...this.state.opts];
        opts[index].link = e.target.value;
        this.setState({
            opts,
        });
    }

    componentDidMount() {
        const { width, fixed, opts } = this.props;
        this.props.form.setFieldsValue({
            width: width || undefined,
            fixed: fixed || undefined,
        });
        if (opts) {
            this.setState({
                opts,
            });
        }
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { visibleOpt, zIndex } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                title="操作"
                visible={visibleOpt}
                onOk={this.setOpt}
                onCancel={this.closeOpt}
                zIndex={zIndex}>
                <Form {...formItemLayout}>
                    <Form.Item
                        label="width">
                        {getFieldDecorator('width')(
                            <InputNumber />,
                        )}
                    </Form.Item>
                    <Form.Item
                        label="fixed">
                        {getFieldDecorator('fixed')(
                            <Radio.Group options={fixedOptions} />,
                        )}
                    </Form.Item>
                    <div>
                        操作按钮：
                        {' '}
                        <Button type="primary" onClick={this.addOpt}>添加</Button>
                    </div>
                    {
                        this.state.opts.map((item, index) => (
                            <div className="set-opt-line" key={index}>
                                <Input placeholder="操作名称" className="set-opt-input" allowClear onChange={e => this.optInputChange(e, index)} value={item.text} />
                                    link: &nbsp;&nbsp;&nbsp;&nbsp;
                                <Radio.Group options={linkOptions} value={item.link} onChange={e => this.optRadioChange(e, index)} />
                            </div>
                        ))
                    }
                </Form>
            </Modal>
        );
    }
}

const SetOptForm = Form.create({ name: 'set_opt' })(SetOpt);

export default SetOptForm;
