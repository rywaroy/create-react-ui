import React, { Component } from 'react';
import { Modal, Form, TreeSelect, Input } from 'antd';
import TemplateItem from '@/components/TemplateItem';

class ListPageCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            configVisible: false,
            configKey: Math.random(),
        };
    }

    /**
     * 打开ListPage文件配置
     */
    openListPageCode = () => {
        this.setState({
            configKey: Math.random(),
        }, () => {
            this.setState({
                configVisible: true,
            });
        });
    }

    /**
     * 关闭ListPage文件配置
     */
    closeListPageCode = () => {
        this.setState({
            configVisible: false,
        });
    }

    render() {
        const { configKey, configVisible } = this.state;
        const { folders } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <TemplateItem
                    title="列表页面配置对象"
                    imgClassName="listPageImg"
                    add={this.openListPageCode} />
                <Modal
                    title="form组件配置"
                    key={configKey}
                    maskClosable={false}
                    visible={configVisible}
                    onCancel={this.closeListPageCode}>
                    <Form>
                        <Form.Item label="导出文件夹">
                            {getFieldDecorator('url', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写导出文件夹',
                                    },
                                ],
                            })(
                                <TreeSelect
                                    showSearch
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="请选择路径"
                                    allowClear
                                    treeData={folders}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="页面名字">
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写页面名字',
                                    },
                                    {
                                        pattern: /^((?!\\|\/|:|\?|\*|"|<|>|\^).)*$/,
                                        message: '请填写正确页面名字',
                                    },
                                ],
                            })(<Input placeholder="请填写页面名字" />)}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        );
    }
}

export default Form.create()(ListPageCode);
