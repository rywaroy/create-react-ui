import React, { useState } from 'react';
import { Modal, Input, InputNumber, Form, Radio, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { RadioChangeEvent } from 'antd/es/radio';
import { IColumn, IOpt } from '@/types/making';
import { fixedOptions, linkOptions } from '@/utils/enum';

interface IProps extends FormComponentProps {
    visible: boolean;
    column: IColumn;
    key: number;
    onCancel: () => void;
    onOk: (values: IColumn) => void;
}

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const SetColumn: React.FC<IProps> = (props) => {
    const { title, dataIndex, width, key, fixed, opts: popts } = props.column;
    const { getFieldDecorator } = props.form;
    const [opts, setOpts] = useState<IOpt[]>(popts || []);

    const onOk = () => {
        props.form.validateFields((err, values: IColumn) => {
            if (!err) {
                if (key === 'action' && opts.length > 0) {
                    values.render = () => (
                        <>
                            {opts.map((item, i) => (item.link ? (
                                <a href="/" target="_blank" className="mr10" key={i}>
                                    {item.text}
                                </a>
                            ) : (
                                <span className="opt-link" key={i}>
                                    {item.text}
                                </span>
                            )))}
                        </>
                    );
                    values.opts = opts;
                    values.key = key;
                }
                props.onOk(values);
            }
        });
    };

    const addOpt = () => {
        const options = [...opts];
        options.push({
            text: '',
            link: false,
        });
        setOpts(options);
    };

    const optInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const options = [...opts];
        options[index].text = e.target.value;
        setOpts(options);
    };

    const optRadioChange = (e: RadioChangeEvent, index: number) => {
        const options = [...opts];
        options[index].link = e.target.value;
        setOpts(options);
    };

    return (
        <Modal
            title="设置"
            visible={props.visible}
            onCancel={props.onCancel}
            onOk={onOk}>
            <Form>
                <Form.Item label="title" {...formItemLayout}>
                    {
                        getFieldDecorator('title', {
                            initialValue: title,
                            rules: [
                                { required: true, message: '请输入title' },
                            ],
                        })(<Input />)
                    }
                </Form.Item>
                {
                    key !== 'action' && (
                        <Form.Item label="dataIndex" {...formItemLayout}>
                            {
                                getFieldDecorator('dataIndex', {
                                    initialValue: dataIndex,
                                    rules: [
                                        { required: true, message: '请输入dataIndex' },
                                    ],
                                })(<Input />)
                            }
                        </Form.Item>
                    )
                }
                <Form.Item label="width" {...formItemLayout}>
                    {
                        getFieldDecorator('width', {
                            initialValue: width,
                        })(<InputNumber min={0} step={1} />)
                    }
                </Form.Item>
                {
                    key === 'action' && (
                        <Form.Item label="fixed" {...formItemLayout}>
                            {
                                getFieldDecorator('fixed', {
                                    initialValue: fixed,
                                })(<Radio.Group options={fixedOptions} />)
                            }
                        </Form.Item>
                    )
                }
            </Form>
            {
                key === 'action' && (
                    <div>
                        <div>
                            操作按钮：<Button type="primary" onClick={addOpt}>添加</Button>
                        </div>
                        {
                            opts.map((item, index) => (
                                <div className="set-opt-line" key={index}>
                                    <Input placeholder="操作名称" className="set-opt-input" allowClear onChange={e => optInputChange(e, index)} value={item.text} />
                            link: &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Radio.Group options={linkOptions} value={item.link} onChange={e => optRadioChange(e, index)} />
                                </div>
                            ))
                        }
                    </div>
                )
            }

        </Modal>
    );
};

export default Form.create<IProps>()(SetColumn);
