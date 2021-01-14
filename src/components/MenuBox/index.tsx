import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { history } from 'umi';

const { SubMenu } = Menu;

interface IState {
    defaultSelectedKey: string[];
    map: IRoute[];
}

interface IRoute {
    title: string;
    key: string;
    icon?: string;
    url?: string;
    children?: IRoute[];
}

class MenuBox extends Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            defaultSelectedKey: [],
            map: [
                {
                    title: '模板',
                    key: 'template',
                    icon: 'file-protect',
                    url: '/template',
                },
                {
                    title: '代码块',
                    key: 'code',
                    icon: 'gold',
                    url: '/code',
                },
                {
                    title: '可视化搭建',
                    key: 'making',
                    icon: 'layout',
                    url: '/making',
                },
                {
                    title: '脚手架',
                    key: 'create',
                    icon: 'tool',
                    url: '/create',
                },
                {
                    title: '文档生成',
                    key: 'document',
                    icon: 'file',
                    url: '/document',
                },
                {
                    title: 'mock数据',
                    key: 'mock',
                    icon: 'api',
                    url: '/mockData',
                },
                {
                    title: '配置',
                    key: 'configlist',
                    icon: 'key',
                    url: '/configlist',
                },
            ],
        };
    }

    /**
     * 点击跳转
     */
    onClickItem = (item: IRoute) => {
        if (item.key === this.state.defaultSelectedKey[0]) {
            return;
        }
        history.push(item.url);
        this.setState({
            defaultSelectedKey: [item.key],
        });
    }

    componentDidMount() {
        const { pathname } = window.location;
        const paths = pathname.split('/');
        this.setState({
            defaultSelectedKey: [paths[paths.length - 1]],
        });
    }

    render() {
        const { defaultSelectedKey } = this.state;
        return (
            <Menu
                mode="inline"
                theme="dark"
                selectedKeys={defaultSelectedKey}
                style={{ borderRight: 0 }}
            >
                {
                    this.state.map.map(item => {
                        if (item.children) {
                            return (
                                <SubMenu
                                    key={item.key}
                                    title={(
                                        <span>
                                            <Icon type={item.icon} />
                                            <span className="nav-text">{item.title}</span>
                                        </span>
                                    )}
                                >
                                    {
                                        item.children.map(child => (
                                            <Menu.Item key={child.key} onClick={() => this.onClickItem(child)}>{child.title}</Menu.Item>
                                        ))
                                    }
                                </SubMenu>
                            );
                        }
                        return (
                            <Menu.Item key={item.key} onClick={() => this.onClickItem(item)}>
                                <Icon type={item.icon} />
                                <span className="nav-text">{item.title}</span>
                            </Menu.Item>
                        );
                    })
                }
            </Menu>
        );
    }
}

export default MenuBox;
