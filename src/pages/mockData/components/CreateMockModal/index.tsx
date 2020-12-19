import React, { useState } from 'react';
import { Form, Modal, TreeSelect, Input, Radio } from 'antd';
import { useSelector } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { isJsOrFolder } from '@/services/file';
import { GlobalModelState } from '@/models/global';

interface IProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
}

const CreateMockModal = (props: IProps) => {
    const { visible, onCancel, form } = props;
    const { getFieldDecorator } = form;
    const [fileType, setFileType] = useState('');
    const { files } = useSelector<any, GlobalModelState>(state => state.global);

    /**
     * 验证是否是js文件或者文件夹
     */
    const validatorPath = (rule, value: string, callback: (err?: Error) => void) => {
        isJsOrFolder({
            url: value,
        }).then((res) => {
            setFileType(res.data.data.type);
            callback();
        }).catch(err => {
            setFileType('');
            callback(err);
        });
    };

    return (
        <Modal
            title="创建mock"
            visible={visible}
            onCancel={onCancel}>
            <Form>
                <Form.Item label="API url">
                    {
                        getFieldDecorator('url', {
                            rules: [
                                { required: true, message: '请填写url' },
                            ],
                        })(
                            <Input />,
                        )
                    }
                </Form.Item>
                <Form.Item label="Method">
                    {
                        getFieldDecorator('method', {
                            initialValue: 'GET',
                            rules: [
                                { required: true, message: '请填写method' },
                            ],
                        })(
                            <Radio.Group>
                                <Radio value="GET">GET</Radio>
                                <Radio value="POST">POST</Radio>
                            </Radio.Group>,
                        )
                    }
                </Form.Item>
                <Form.Item label="Mock 文件夹/文件">
                    {
                        getFieldDecorator('path', {
                            rules: [
                                { required: true, message: '请选择文件夹或文件路径' },
                                { validator: validatorPath },
                            ],
                        })(
                            <TreeSelect
                                showSearch
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="请选择路径"
                                allowClear
                                treeData={files} />,
                        )
                    }
                </Form.Item>
                {
                    fileType === 'folder'
                    && (
                        <Form.Item label="文件名">
                            {
                                getFieldDecorator('fileName', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写文件名',
                                        },
                                        {
                                            pattern: /^[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+$/,
                                            message: '请填写正确文件名',
                                        },
                                    ],
                                })(
                                    <Input />,
                                )
                            }
                        </Form.Item>
                    )
                }
                <Form.Item label="请求函数名">
                    {
                        getFieldDecorator('functionName', {
                            rules: [
                                {
                                    pattern: /^[a-zA-Z$_][a-zA-Z\d_]*$/,
                                    message: '请填写正确函数名',
                                },
                            ],
                        })(
                            <Input />,
                        )
                    }
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Form.create<IProps>()(CreateMockModal);
