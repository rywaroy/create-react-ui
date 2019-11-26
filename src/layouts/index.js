import React, { Component } from 'react';
import { Layout } from 'antd';
import MenuBox from '@/components/MenuBox';

const { Content, Sider } = Layout;

class BasicLayout extends Component {

    render() {
        return (
            <Layout style={{ height: '100%', minWidth: 1200 }}>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <MenuBox />
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px', background: '#23232e' }}>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default BasicLayout;
