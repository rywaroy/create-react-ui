import React, { useState } from 'react';
import { Modal, Form, Input, TreeSelect } from 'antd';
import TemplateItem from '@/components/TemplateItem';
import { createDefaultTemplate } from '@/services/template';

function DefaultTemplate(props) {
    const [visible, setVisible] = useState(false);
    const { folders } = props;
    const { getFieldDecorator } = props.form;

    const addDefaultTemplate = () => {
        setVisible(true);
        props.form.setFields({
            folderName: {
                value: '',
            },
            fileName: {
                value: 'index.js',
            },
            variable: {
                value: '',
            },
        });
    };

    const handleOk = () => {
        props.form.validateFields((err, values) => {
            if (!err) {
                createDefaultTemplate(values)
                    .then(() => {
                        handleCancel();
                        props.updateFiles();
                    });
            }
        });
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <TemplateItem
                title="默认react模板"
                intro="包含index.js 可配置变量名"
                imgClassName="defaultImg"
                add={addDefaultTemplate} />
            <Modal
                title="添加默认模板"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form>
                    <Form.Item label="添加到">
                        {
                            getFieldDecorator('url')(
                                <TreeSelect
                                    showSearch
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="请选择路径"
                                    allowClear
                                    treeData={folders} />,
                            )
                        }
                    </Form.Item>
                    <Form.Item label="文件夹名">
                        {
                            getFieldDecorator('folderName', {
                                rules: [
                                    {
                                        pattern: /^((?!\\|\/|:|\?|\*|"|<|>|\^).)*$/,
                                        message: '请填写正确文件夹名',
                                    },
                                ],
                            })(<Input />)
                        }
                    </Form.Item>
                    <Form.Item label="文件名">
                        {
                            getFieldDecorator('fileName', {
                                initialValue: 'index.js',
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
                            })(<Input />)
                        }
                    </Form.Item>
                    <Form.Item label="变量名">
                        {
                            getFieldDecorator('variable', {
                                rules: [
                                    {
                                        pattern: /^[a-zA-Z$_][a-zA-Z\d_]*$/,
                                        message: '请填写正确变量名',
                                    },
                                ],
                            })(<Input />)
                        }
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Form.create()(DefaultTemplate);
