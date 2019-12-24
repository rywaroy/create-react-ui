import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import router from 'umi/router';

class MenuBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultSelectedKey: ['template'],
            map: [
                {
                    title: '模板',
                    key: 'template',
                    icon: 'file-protect',
                    url: '/'
                },
                {
                    title: '代码块',
                    key: 'code',
                    icon: 'gold',
                    url: '/code'
                }
            ]
        };
    }

    /**
     * 点击跳转
     */
    onClickItem = item => {
    	router.push(item.url);
        this.setState({
            defaultSelectedKey: [item.title]
        });
    }

    componentDidMount() {
        const pathname = window.location.pathname;
        this.setState({
            defaultSelectedKey: pathname.split('/')[1]
        });
    }

    render() {
        return (
            <Menu
                mode="inline"
                theme="dark"
                selectedKeys={this.state.defaultSelectedKey}
                style={{ height: '100%', borderRight: 0, background: '#30303d' }}
            >
                {
                    this.state.map.map(item => (
                        <Menu.Item key={item.key} onClick={() => this.onClickItem(item)}>
                            <Icon type={item.icon} />
                            <span className="nav-text">{item.title}</span>
                        </Menu.Item>
                    ))
                }
            </Menu>
        );
    }
}

export default MenuBox;
