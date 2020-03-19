import React, { Component } from 'react';
import { Modal, Form, TreeSelect, Input, Button, Icon } from 'antd';
import TemplateItem from '@/components/TemplateItem';
import ListPageModal from './ListPageModal';

class ListPageCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            configVisible: false,
            configKey: Math.random(),
            lpVisible: false,
            lpKey: Math.random(),
            pageOption: null, // 页面配置对象
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

    /**
     * 生成页面
     */
    sendListPageCode = () => {
        this.props.form.validateFields((err) => {
            if (!err) {
                this.closeListPageCode();
            }
        });
    }

    /**
     * 打开列表页面配置
     */
    openListPageModal = () => {
        this.setState({
            lpVisible: true,
        });
    }

    /**
     * 关闭列表页面配置
     */
    closeListPageModal = () => {
        this.setState({
            lpVisible: false,
        });
    }

    /**
     * 获取页面总配置对象
     */
    getPageOtion = option => {
        this.setState({
            pageOption: option,
        });
        this.closeListPageModal();
    }

    render() {
        const { configKey, configVisible, lpVisible, lpKey, pageOption } = this.state;
        const { folders } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <TemplateItem
                    title="列表页面配置对象"
                    imgClassName="listPageImg"
                    add={this.openListPageCode} />
                <Modal
                    title="列表页面组件配置"
                    key={configKey}
                    maskClosable={false}
                    visible={configVisible}
                    onCancel={this.closeListPageCode}
                    onOk={this.sendListPageCode}>
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
                        <Form.Item label="namespace">
                            {
                                getFieldDecorator('namespace', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写页面空间命名',
                                        },
                                        {
                                            pattern: /^[a-zA-Z$_][a-zA-Z\d_]*$/,
                                            message: '请填写正确空间命名',
                                        },
                                    ],
                                })(<Input placeholder="请输入model namespace" />)
                            }
                        </Form.Item>
                        <Form.Item label={(
                            <span>
                                页面配置
                                {' '}
                                {
                                    pageOption && <Icon type="check" style={{ color: 'red' }} />
                                }
                            </span>
                        )}>
                            <Button type="primary" onClick={this.openListPageModal}>设置</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <ListPageModal
                    visible={lpVisible}
                    key={lpKey}
                    onCancel={this.closeListPageModal}
                    getPageOtion={this.getPageOtion} />
            </div>

        );
    }
}

export default Form.create()(ListPageCode);
