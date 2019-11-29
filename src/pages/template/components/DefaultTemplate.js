import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import TemplateItem from './TemplateItem';
import FolderTreeSelect from '@/components/FolderTreeSelect';

class DefaultTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            key: Math.random(),
        };
    }

    addDefaultTemplate = () => {
        this.setState({
            visible: true,
            key: Math.random(),
        });
        this.props.form.setFields({
            url: {
                value: '',
            },
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
    }

    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const { visible, key } = this.state;
        const { folders } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <TemplateItem
                    title="默认react模板"
                    intro="包含index.js 可配置变量名"
                    imgClassName="defaultImg"
                    add={this.addDefaultTemplate}/>
                <Modal
                    title="添加默认模板"
                    key={key}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <Form>
                        <Form.Item label="添加到">
                            {
                                getFieldDecorator('url')(<FolderTreeSelect folders={folders}/>)
                            }
                        </Form.Item>
                        <Form.Item label="文件夹名">
                            {
                                getFieldDecorator('folderName', {
                                    rules: [
                                        {
                                            pattern: /^((?!\\|\/|\:|\?|\*|\"|<|>|\^).)*$/,
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
                                            pattern: /^[a-zA-Z0-9\-\_]+\.[a-zA-Z0-9\-\_]+$/,
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
                                            pattern: /^[a-zA-Z\$_][a-zA-Z\d_]*$/,
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
}

export default Form.create()(DefaultTemplate);