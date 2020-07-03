import React, { Component } from 'react';
import { Modal, Form, TreeSelect, Input, Button, Icon, message } from 'antd';
import TemplateItem from '@/components/TemplateItem';
import { FormComponentProps } from 'antd/es/form';
import { createListPage } from '@/services/code';
import { TreeNode } from 'antd/es/tree-select';
import { IListPage, IListPageOption } from '@/types/code';
import ListPageModal from './ListPageModal';

const { confirm } = Modal;

interface IProps extends FormComponentProps {
    folders: TreeNode[];
}

interface IState {
    configVisible: boolean;
    configKey: number;
    lpVisible: boolean;
    lpKey: number;
    pageOption: any;
}

class ListPageCode extends Component<IProps, IState> {
    constructor(props: IProps) {
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
    closeListPageCode = (isTip = true) => {
        const { pageOption } = this.state;
        if (pageOption && isTip) {
            confirm({
                title: '确认',
                content: '你已经配置了页面，关闭弹窗则会清空数据，是否确认关闭？',
                onOk: () => {
                    this.setState({
                        pageOption: null,
                        lpKey: Math.random(),
                        configVisible: false,
                    });
                },
            });
        } else {
            this.setState({
                pageOption: null,
                lpKey: Math.random(),
                configVisible: false,
            });
        }
    }

    /**
     * 生成页面
     */
    sendListPageCode = () => {
        this.props.form.validateFields((err, values: IListPage) => {
            if (!err) {
                const { pageOption } = this.state;
                if (!pageOption) {
                    message.error('请选配置页面');
                    return;
                }
                createListPage({
                    ...values,
                    pageOption,
                }).then(() => {
                    message.success('创建成功');
                    this.closeListPageCode(false);
                });
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
    getPageOtion = (option: IListPageOption) => {
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
                    intro=""
                    imgClassName="listPageImg"
                    add={this.openListPageCode} />
                <Modal
                    title="列表页面组件配置"
                    key={configKey}
                    maskClosable={false}
                    visible={configVisible}
                    onCancel={() => this.closeListPageCode()}
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

export default Form.create<IProps>()(ListPageCode);
