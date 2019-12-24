import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import router from 'umi/router';

class MenuBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultSelectedKey: ['模板'],
            map: [
                {
                    title: '模板',
                    key: '模板',
                    icon: 'file-protect',
                    url: '/'
                },
                {
                    title: '代码块',
                    key: '代码块',
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
