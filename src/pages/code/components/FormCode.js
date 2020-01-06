import React, { Component } from 'react';
import { Modal, Form, Input, Icon, Button, TreeSelect } from 'antd';
import TemplateItem from '@/components/TemplateItem';
import CreateForm from '@/components/CreateForm';

class FormCode extends Component {
    constructor(props) {
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
    }

    /**
     * 关闭form文件配置
     */
    closeFormCode = () => {
        this.setState({
            configVisible: false,
        });
    }

    /**
     * 代开代码生成弹窗
     */
    openCreateCode = () => {
        this.setState({
            codeKey: Math.random(),
        }, () => {
            this.setState({
                codeVisible: true
            });
        });
    }

    /**
     * 关闭代码生成弹窗
     */
    closeCreateCode = () => {
        this.setState({
            codeVisible: false
        });
    }

    /**
     * 生成的代码
     */
    createCode = () => {
        this.createForm.create();
        this.closeCreateCode();
    }

    /**
     * 获取生成的代码
     */
    getCode = code => {
        this.props.form.setFieldsValue({
            code
        });
        this.setState({
            code,
        });
    }

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
                    add={this.openFormCode}/>
                <Modal
                    title="form组件配置"
                    key={configKey}
                    visible={configVisible}
                    onCancel={this.closeFormCode}
                    onOk={this.create}>
                    <Form>
                        <Form.Item label="导出文件">
                            {
                                getFieldDecorator('url', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写导出文件',
                                        },
                                    ]
                                })(<TreeSelect
                                    showSearch
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="请选择路径"
                                    allowClear
                                    treeData={files}/>)
                            }
                        </Form.Item>
                        <Form.Item label={<span>代码片段 <button style={{ background: 'none', border: '0', outline: 'none' }} data-clipboard-text={code} id="code"><Icon type="copy"/></button></span>}>
                            {
                                getFieldDecorator('code', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请先生成代码片段',
                                        },
                                    ]
                                })(<Input disabled/>)
                            }
                        </Form.Item>
                        <Button type="primary" onClick={this.openCreateCode}>代码生成</Button>
                    </Form>
                </Modal>
                <Modal
                    title="form组件配置"
                    width="1400px"
                    key={codeKey}
                    visible={codeVisible}
                    onOk={this.createCode}
                    onCancel={this.closeCreateCode}
                    okText="生成代码"
                    zIndex="1002">
                    <CreateForm
                        wrappedComponentRef={ref => this.createForm = ref}
                        getCode={this.getCode}/>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(FormCode);