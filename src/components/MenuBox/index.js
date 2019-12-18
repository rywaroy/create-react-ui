import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

class MenuBox extends Component {

    render() {
        return (
            <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={['模板']}
                style={{ height: '100%', borderRight: 0, background: '#30303d' }}
            >
                <Menu.Item key="模板">
                    <Icon type="file-protect" />
                    <span className="nav-text">模板</span>
                </Menu.Item>
            </Menu>
        );
    }
}

export default MenuBox;
