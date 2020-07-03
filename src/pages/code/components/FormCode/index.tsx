import React, { Component } from 'react';
import { Modal, Form, Input, Icon, Button, TreeSelect } from 'antd';
import TemplateItem from '@/components/TemplateItem';
import CreateForm from '@/components/CreateForm';
import { isJs } from '@/services/file';
import { createFormCode } from '@/services/code';
import { FormComponentProps } from 'antd/es/form';
import { TreeNode } from 'antd/es/tree-select';
import { IFormCode } from '@/types/code';

interface IState {
    configVisible: boolean;
    configKey: number;
    code: string;
    codeKey: number;
    codeVisible: boolean;
}

interface IProps extends FormComponentProps {
    files: TreeNode[];
    updateFiles: () => void;
}

class FormCode extends Component<IProps, IState> {
    createForm: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            configVisible: false,
            configKey: Math.random(),
            code: '',
            codeKey: Math.random(),
            codeVisible: false,
        };
    }

    /**
     * 打开form文件配置
     */
    openFormCode = () => {
        this.setState({
            configKey: Math.random(),
        }, () => {
            this.setState({
                configVisible: true,
            });
        });
    };

    /**
     * 关闭form文件配置
     */
    closeFormCode = () => {
        this.setState({
            configVisible: false,
        });
    };

    /**
     * 代开代码生成弹窗
     */
    openCreateCode = () => {
        this.setState({
            codeKey: Math.random(),
        }, () => {
            this.setState({
                codeVisible: true,
            });
        });
    };

    /**
     * 关闭代码生成弹窗
     */
    closeCreateCode = () => {
        this.setState({
            codeVisible: false,
        });
    };

    /**
     * 生成的代码
     */
    createCode = () => {
        this.createForm.create();
        this.closeCreateCode();
    };

    /**
     * 获取生成的代码
     */
    getCode = (code: string) => {
        this.props.form.setFieldsValue({
            code,
        });
        this.setState({
            code,
        });
    };

    /**
     * 验证是否是js文件
     */
    isJs = (rule, value: string, callback: (err?: Error) => void) => {
        isJs({
            url: value,
        }).then(() => {
            callback();
        }).catch(err => {
            callback(err);
        });
    };

    /**
     * 创建文件
     */
    create = () => {
        this.props.form.validateFields((err, values: IFormCode) => {
            if (!err) {
                createFormCode(values).then(() => {
                    this.closeFormCode();
                    this.props.updateFiles();
                });
            }
        });
    };

    render() {
        const { configVisible, configKey, code, codeKey, codeVisible } = this.state;
        const { files } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <TemplateItem
                    title="form组件配置对象"
                    intro="配合油涟组件GenerateForm使用"
                    imgClassName="formImg"
                    add={this.openFormCode}
                />
                <Modal
                    title="form组件配置"
                    key={configKey}
                    visible={configVisible}
                    maskClosable={false}
                    onCancel={this.closeFormCode}
                    onOk={this.create}>
                    <Form>
                        <Form.Item label="导出文件">
                            {getFieldDecorator('url', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写导出文件',
                                    },
                                    {
                                        validator: this.isJs,
                                    },
                                ],
                            })(
                                <TreeSelect
                                    showSearch
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="请选择路径"
                                    allowClear
                                    treeData={files}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item
                            label={(
                                <span>
                                    代码片段
                                    {' '}
                                    <button
                                        style={{
                                            background: 'none',
                                            border: '0',
                                            outline: 'none',
                                        }}
                                        data-clipboard-text={code}
                                        id="code">
                                        <Icon type="copy" />
                                    </button>
                                </span>
                            )}>
                            {getFieldDecorator('code', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请先生成代码片段',
                                    },
                                ],
                            })(<Input disabled />)}
                        </Form.Item>
                        <Button type="primary" onClick={this.openCreateCode}>
                            代码生成
                        </Button>
                    </Form>
                </Modal>
                <Modal
                    title="form组件配置"
                    width="1400px"
                    key={codeKey}
                    visible={codeVisible}
                    maskClosable={false}
                    onOk={this.createCode}
                    onCancel={this.closeCreateCode}
                    okText="生成代码"
                    zIndex={1002}>
                    <CreateForm
                        wrappedComponentRef={ref => { this.createForm = ref; }}
                        getCode={this.getCode}
                    />
                </Modal>
            </div>
        );
    }
}

export default Form.create<IProps>()(FormCode);
