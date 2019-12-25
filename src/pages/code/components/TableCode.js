import React, { Component } from 'react';
import { Modal, Form, Input, Icon, Tooltip } from 'antd';
import TemplateItem from '@/components/TemplateItem';
import FolderTreeSelect from '@/components/FolderTreeSelect';

class TableCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            configVisible: false
        };
    }

    addTableCode = () => {
        this.setState({
            configVisible: true
        });
    }

    render() {
        const { configVisible } = this.state;
        const { files } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <TemplateItem
                    title="table组件配置对象"
                    intro=""
                    imgClassName="customImg"
                    add={this.addTableCode}/>
                <Modal
                    title="table组件配置"
                    visible={configVisible}>
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
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(TableCode);