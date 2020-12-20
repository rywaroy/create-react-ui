import React, { useState } from 'react';
import { Form, Modal, TreeSelect, Input, Radio, Select } from 'antd';
import { useSelector } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { isJsOrFolder, isJs } from '@/services/file';

import { GlobalModelState } from '@/models/global';

interface IProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
}

const CreateMockModal = (props: IProps) => {
    const { visible, onCancel, form } = props;
    const { getFieldDecorator, validateFields } = form;
    const [fileType, setFileType] = useState('');
    const [baseUrl, setBaseUrl] = useState('/marketingScoreNode/proxy/tradeManager');
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

    /**
     * 验证是否是js文件
     */
    const validatorServerPath = (rule, value: string, callback: (err?: Error) => void) => {
        if (!value) {
            callback();
            return;
        }
        isJs({
            url: value,
        }).then(() => {
            callback();
        }).catch(err => {
            callback(err);
        });
    };

    const selectBefore = (
        <Select defaultValue="/marketingScoreNode/proxy/tradeManager" onChange={(value: string) => setBaseUrl(value)}>
            <Select.Option value="/marketingScoreNode/proxy/tradeManager">/marketingScoreNode/proxy/tradeManager</Select.Option>
            <Select.Option value="/oilChainBoss">/oilChainBoss</Select.Option>
            <Select.Option value="/oilChainEnterprice">/oilChainEnterprice</Select.Option>
            <Select.Option value="/oilChainGasStation">/oilChainGasStation</Select.Option>
        </Select>
    );

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
                            <Input addonBefore={selectBefore} />,
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
                        getFieldDecorator('serverName', {
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
                <Form.Item label="请求函数文件">
                    {
                        getFieldDecorator('serverPath', {
                            rules: [
                                { validator: validatorServerPath },
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
            </Form>
        </Modal>
    );
};

export default Form.create<IProps>()(CreateMockModal);
