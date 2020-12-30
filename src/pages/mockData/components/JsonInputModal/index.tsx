import React from 'react';
import { Form, Modal, Input, message } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { IJsonValue } from '@/types/mockData';

interface IProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    onOk: (values: IJsonValue) => void;
}

const JsonInputModal: React.FC<IProps> = (props) => {
    const { visible, onOk, onCancel, form } = props;
    const { getFieldDecorator, validateFields } = form;

    const onSubmit = () => {
        validateFields((err, values: IJsonValue) => {
            if (!err) {
                try {
                    let json;
                    eval(`json = ${(values.json as string).replace(/`|\$/g, $1 => `\\${$1}`)}`);
                    values.json = json;
                    onOk(values);
                    onCancel();
                } catch {
                    message.error('json格式有误');
                }
            }
        });
    };

    return (
        <Modal
            title="导入json"
            visible={visible}
            onOk={onSubmit}
            onCancel={onCancel}>
            <Form.Item label="value 值">
                {
                    getFieldDecorator('value', {
                        initialValue: 'dataIndex',
                        rules: [
                            { required: true, message: '请填写value' },
                        ],
                    })(
                        <Input />,
                    )
                }
            </Form.Item>
            <Form.Item label="json">
                {
                    getFieldDecorator('json', {
                        rules: [
                            { required: true, message: '请填写json' },
                        ],
                    })(
                        <Input.TextArea rows={8} />,
                    )
                }
            </Form.Item>
        </Modal>
    );
};

export default Form.create<IProps>()(JsonInputModal);
