import React, { Component } from 'react';
import { Modal, Form, Icon, Button, TreeSelect } from 'antd';
import TemplateItem from '@/components/TemplateItem';
import CreateTable from '@/components/CreateTable';
import { isJs } from '@/services/file';
import { createTableCode } from '@/services/code';
import { FormComponentProps } from 'antd/es/form';
import { TreeNode } from 'antd/es/tree-select';
import { ITableCode, ITableValues } from '@/types/code';

interface IState {
    configVisible: boolean;
    configKey: number;
    codeKey: number;
    codeVisible: boolean;
    tableValues: ITableValues;
}

interface IProps extends FormComponentProps {
    files: TreeNode[];
    updateFiles: () => void;
}

class TableCode extends Component<IProps, IState> {
    createTable: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            configVisible: false,
            configKey: Math.random(),
            codeVisible: false,
            codeKey: Math.random(),
            tableValues: undefined,
        };
    }

    /**
     * 打开table文件配置
     */
    openTableCode = () => {
        this.setState({
            configKey: Math.random(),
        }, () => {
            this.setState({
                configVisible: true,
            });
        });
    };

    /**
     * 关闭table文件配置
     */
    closeTableCode(tip: boolean) {
        if (this.state.tableValues && tip) {
            Modal.confirm({
                title: '已经配置表格，确定取消?',
                onOk: () => {
                    this.setState({
                        configVisible: false,
                        codeKey: Math.random(),
                        tableValues: undefined,
                    });
                },
            })
        } else {
            this.setState({
                configVisible: false,
                codeKey: Math.random(),
                tableValues: undefined,
            });
        }
    }

    /**
     * 打开代码生成弹窗
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
        this.createTable.create();
        this.closeCreateCode();
    };

    /**
     * 获取生成的表格对象
     */
    getTableValues = (values: ITableValues) => {
        this.setState({
            tableValues: values,
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
        this.props.form.validateFields((err, values: ITableCode) => {
            if (!err) {
                createTableCode({ ...values, ...this.state.tableValues }).then(() => {
                    this.closeTableCode(false);
                    this.props.updateFiles();
                });
            }
        });
    };

    render() {
        const {
            configVisible,
            codeVisible,
            configKey,
            tableValues,
            codeKey,
        } = this.state;
        const { files } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <TemplateItem
                    title="table组件配置对象"
                    intro=""
                    imgClassName="tableImg"
                    add={this.openTableCode}
                />
                <Modal
                    title="table组件配置"
                    key={configKey}
                    visible={configVisible}
                    maskClosable={false}
                    onCancel={() => this.closeTableCode(true)}
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
                                表格配置配置
                                    {' '}
                                    {
                                        tableValues && <Icon type="check" style={{ color: 'red' }} />
                                    }
                                </span>
                            )} />
                        <Button type="primary" onClick={this.openCreateCode}>
                            代码生成
                        </Button>
                    </Form>
                </Modal>
                <Modal
                    title="table组件配置"
                    width="1200px"
                    key={codeKey}
                    visible={codeVisible}
                    maskClosable={false}
                    onOk={this.createCode}
                    onCancel={this.closeCreateCode}
                    okText="生成代码"
                    zIndex={1002}>
                    <CreateTable
                        ref={ref => { this.createTable = ref; }}
                        getTableValues={this.getTableValues}
                    />
                </Modal>
            </div>
        );
    }
}

export default Form.create<IProps>()(TableCode);
