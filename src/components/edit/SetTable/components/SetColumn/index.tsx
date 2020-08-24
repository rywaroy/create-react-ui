import React, { useEffect } from 'react';
import { Modal, Input, InputNumber, Form } from 'antd';
import { FormComponentProps } from 'antd/es/form';

interface IProps extends FormComponentProps {
    visible: boolean;
    title: string;
    dataIndex: string;
    width?: number;
}

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const SetColumn: React.FC<IProps> = (props) => {
    const { title, dataIndex, width } = props;
    const { getFieldDecorator } = props.form;

    useEffect(() => {
        console.log(111);
    }, []);

    return (
        <Modal
            title="设置"
            visible={props.visible}>
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

export default Form.create()(SetColumn);
