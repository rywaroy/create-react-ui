import React, { Component } from 'react';
import { Modal, Form, Icon, Button, TreeSelect } from 'antd';
import TemplateItem from '@/components/TemplateItem';
import CreateForm from '@/components/CreateForm';
import { isJs } from '@/services/file';
import { createFormCode } from '@/services/code';
import { FormComponentProps } from 'antd/es/form';
import { TreeNode } from 'antd/es/tree-select';
import { IFormCode, IFormObject } from '@/types/code';

interface IState {
    configVisible: boolean;
    configKey: number;
    codeKey: number;
    codeVisible: boolean;
    formObject: IFormObject;
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
            codeKey: Math.random(),
            codeVisible: false,
            formObject: undefined,
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
    closeFormCode(tip: boolean) {
        if (this.state.formObject && tip) {
            Modal.confirm({
                title: '已经配置表格，确定取消?',
                onOk: () => {
                    this.setState({
                        configVisible: false,
                        codeKey: Math.random(),
                        formObject: undefined,
                    });
                },
            });
        } else {
            this.setState({
                configVisible: false,
                codeKey: Math.random(),
                formObject: undefined,
            });
        }
    }

    /**
     * 代开代码生成弹窗
     */
    openCreateCode = () => {
        this.setState({
            codeVisible: true,
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
    getFormObject = (values: IFormObject) => {
        this.setState({
            formObject: values,
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
                createFormCode({ ...values, ...this.state.formObject }).then(() => {
                    this.closeFormCode(false);
                    this.props.updateFiles();
                });
            }
        });
    };

    render() {
        const { configVisible, configKey, codeKey, codeVisible, formObject } = this.state;
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
                    onCancel={() => this.closeFormCode(true)}
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
                            colon={false}
                            label={(
                                <span>
                                 表单配置
                                    {' '}
                                    {
                                        formObject && <Icon type="check" style={{ color: 'red' }} />
                                    }
                                </span>
                            )} />
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
                        getFormObject={this.getFormObject}
                    />
                </Modal>
            </div>
        );
    }
}

export default Form.create<IProps>()(FormCode);
