import React, { useState } from 'react';
import { Modal, Input, InputNumber, Form, Radio, Button, Select, Switch } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { IColumn, IOpt, IMaterial } from '@/types/making';
import { fixedOptions } from '@/utils/enum';

interface IProps extends FormComponentProps {
    visible: boolean;
    column: IColumn;
    modalList: IMaterial[];
    key: number;
    onCancel: () => void;
    onOk: (values: IColumn) => void;
}

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
};

const SetColumn: React.FC<IProps> = (props) => {
    const { modalList } = props;
    const modalNameList = modalList.map(item => ({
        label: `${item.props.title}${item.props.modalName}`,
        value: item.props.modalName,
    }));
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
            linkModal: '',
        });
        setOpts(options);
    };

    const optInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const options = [...opts];
        options[index].text = e.target.value;
        setOpts(options);
    };

    const optLinkChange = (value: boolean, index: number) => {
        const options = [...opts];
        options[index].link = value;
        setOpts(options);
    };

    const deleteOpt = (index: number) => {
        const options = [...opts];
        options.splice(index, 1);
        setOpts(options);
    };

    const selectModal = (value: string, index: number) => {
        const options = [...opts];
        options[index].linkModal = value;
        setOpts(options);
    };

    return (
        <Modal
            width="600px"
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
                            操作按钮：<Button type="primary" icon="plus" size="small" onClick={addOpt} />
                        </div>
                        {
                            opts.map((item, index) => (
                                <div className="set-opt-line" key={index}>
                                    <Input placeholder="操作名称" className="set-opt-input" allowClear onChange={e => optInputChange(e, index)} value={item.text} />
                                    外链: &nbsp;&nbsp;
                                    <Switch checked={item.link} onChange={value => optLinkChange(value, index)} />
                                    &nbsp;&nbsp;绑定弹窗: &nbsp;&nbsp;
                                    <Select style={{ width: '150px' }} onChange={(value: string) => selectModal(value, index)} value={item.linkModal}>
                                        {
                                            modalNameList.map(item => (
                                                <Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                    &nbsp;&nbsp;
                                    <Button type="primary" icon="minus" onClick={() => deleteOpt(index)} />
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
