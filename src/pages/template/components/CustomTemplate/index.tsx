import React, { useState } from 'react';
import { Modal, Form, Input, Icon, Tooltip, TreeSelect } from 'antd';
import TemplateItem from '@/components/TemplateItem';
import { getTemplate } from '@/services/file';
import { createCustomTemplate } from '@/services/template';
import { TreeNode } from 'antd/es/tree-select';
import { FormComponentProps } from 'antd/es/form';
import { ICustomFormValues } from '@/types/template';

interface IProps extends FormComponentProps {
    folders: TreeNode[];
    updateFiles: () => void;
}

const CustomTemplate: React.FC<IProps> = (props) => {
    const [visible, setVisible] = useState(false);
    const [files, setFiles] = useState([]);
    const { folders } = props;
    const { getFieldDecorator } = props.form;

    const addCustomTemplate = () => {
        getTemplate()
            .then(res => {
                setVisible(true);
                setFiles(res.data.data);
                props.form.setFields({
                    folderName: {
                        value: '',
                    },
                    variable: {
                        value: '',
                    },
                });
            });
    };

    const handleOk = () => {
        props.form.validateFields((err, values: ICustomFormValues) => {
            if (!err) {
                createCustomTemplate(values)
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
                title="自定义模板"
                intro="可自定义模板文件，根据指定模板文件生成代码"
                imgClassName="customImg"
                add={addCustomTemplate} />
            <Modal
                title="添加自定义模板"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form>
                    <Form.Item
                        label={(
                            <span>
模板文件夹
                                <Tooltip title="在根目录下创建.crui/template文件夹,该文件夹内所有文件将作为模板使用"><Icon type="question-circle" /></Tooltip>
                            </span>
                        )}
                        colon={false}>
                        {
                            getFieldDecorator('mode', {
                                initialValue: '/.crui/template',
                            })(<Input disabled />)
                        }
                    </Form.Item>
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
                    <Form.Item label={(
                        <span>
主文件名
                            <Tooltip title="默认导出组件的文件，配合修改变量名/类名"><Icon type="question-circle" /></Tooltip>
                        </span>
                    )}>
                        {
                            getFieldDecorator('fileName')(
                                <TreeSelect
                                    showSearch
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="请选择路径"
                                    allowClear
                                    treeData={files} />,
                            )
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

export default Form.create<IProps>()(CustomTemplate);
