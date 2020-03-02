import React, { Component } from 'react';
import { Modal, Form, Input, Icon, Button, TreeSelect } from 'antd';
import TemplateItem from '@/components/TemplateItem';
import CreateTable from '@/components/CreateTable';
import { isJs } from '@/services/file';
import { createTableCode } from '@/services/code';

class TableCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            configVisible: false,
            configKey: Math.random(),
            codeVisible: false,
            code: '', // 代码片段
            codeKey: Math.random(),
        };
    }

    /**
     * 打开table文件配置
     */
    openTableCode = () => {
        this.setState(
            {
                configKey: Math.random(),
            },
            () => {
                this.setState({
                    configVisible: true,
                });
            },
        );
    };

    /**
     * 关闭table文件配置
     */
    closeTableCode = () => {
        this.setState({
            configVisible: false,
        });
    };

    /**
     * 打开代码生成弹窗
     */
    openCreateCode = () => {
        this.setState(
            {
                codeKey: Math.random(),
            },
            () => {
                this.setState({
                    codeVisible: true,
                });
            },
        );
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
     * 获取生成的代码
     */
    getCode = code => {
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
    isJs = (rule, value, callback) => {
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
        this.props.form.validateFields((err, values) => {
            if (!err) {
                createTableCode(values).then(() => {
                    this.closeTableCode();
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
            code,
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
                    onCancel={this.closeTableCode}
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
                    title="table组件配置"
                    width="1200px"
                    key={codeKey}
                    visible={codeVisible}
                    onOk={this.createCode}
                    onCancel={this.closeCreateCode}
                    okText="生成代码"
                    zIndex="1002">
                    <CreateTable
                        ref={ref => { this.createTable = ref; }}
                        getCode={this.getCode}
                    />
                </Modal>
            </div>
        );
    }
}

export default Form.create()(TableCode);
