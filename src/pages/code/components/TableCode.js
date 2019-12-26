import React, { Component } from 'react';
import { Modal, Form, Input, Icon, Button } from 'antd';
import TemplateItem from '@/components/TemplateItem';
import FolderTreeSelect from '@/components/FolderTreeSelect';

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
                                        }
                                    ]
                                })(<FolderTreeSelect folders={files}/>)
                            }
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(TableCode);