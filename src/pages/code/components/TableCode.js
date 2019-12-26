import React, { Component } from 'react';
import { Modal, Form, Input, Icon, Button } from 'antd';
import TemplateItem from '@/components/TemplateItem';
import FolderTreeSelect from '@/components/FolderTreeSelect';
import CreateTable from '@/components/CreateTable';

class TableCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            configVisible: false,
            configKey: Math.random(),
            codeVisible: false,
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
    }

    /**
     * 关闭table文件配置
     */
    closeTableCode = () => {
        this.setState({
            configVisible: false,
        });
    }

    /**
     * 打开代码生成弹窗
     */
    openCreateCode = () => {
        this.setState({
            codeVisible: true
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


    render() {
        const { configVisible, codeVisible, configKey } = this.state;
        const { files } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <TemplateItem
                    title="table组件配置对象"
                    intro=""
                    imgClassName="customImg"
                    add={this.openTableCode}/>
                <Modal
                    title="table组件配置"
                    key={configKey}
                    visible={configVisible}
                    onCancel={this.closeTableCode}>
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
                                })(<FolderTreeSelect folders={files}/>)
                            }
                        </Form.Item>
                        <Form.Item label={<span>代码片段 <Icon type="copy" /></span>}>
                            {
                                getFieldDecorator('code', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请先生成代码片段',
                                        },
                                    ]
                                })(<Input disabled />)
                            }
                        </Form.Item>
                        <Button type="primary" onClick={this.openCreateCode}>代码生成</Button>
                    </Form>
                </Modal>
                <Modal
                    title="table组件配置"
                    width="1200px"
                    visible={codeVisible}
                    onOk={this.createCode}
                    onCancel={this.closeCreateCode}
                    okText="生成代码"
                    zIndex="1002">
                    <CreateTable/>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(TableCode);