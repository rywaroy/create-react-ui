import React, { useEffect } from 'react';
import { Modal, Input, InputNumber, Form } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { IColumn } from '@/types/making';

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
    const { title, dataIndex, width } = props.column;
    const { getFieldDecorator } = props.form;

    const onOk = () => {
        props.form.validateFields((err, values: IColumn) => {
            if (!err) {
                props.onOk(values);
            }
        });
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
                <Form.Item label="width" {...formItemLayout}>
                    {
                        getFieldDecorator('width', {
                            initialValue: width,
                        })(<InputNumber min={0} step={1} />)
                    }
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Form.create<IProps>()(SetColumn);
