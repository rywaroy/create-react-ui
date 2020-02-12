import React, { Component } from 'react';
import { Layout, ConfigProvider, notification, Icon } from 'antd';
import { connect } from 'dva';
import 'antd/dist/antd.css';
import MenuBox from '@/components/MenuBox';
import zhCN from 'antd/es/locale/zh_CN';

const { Content, Sider } = Layout;

class BasicLayout extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'global/updateFiles'
        });
        window.socket.on('msg', data => {
            notification.open({
                message: data.msg,
                icon: data.status === 200 ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> : <Icon type="close-circle" style={{ color: 'red' }} />,
            });
        });
        setInterval(() => {
            window.socket.emit('heart-link');
        }, 10000);
    }

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
                            <ConfigProvider locale={zhCN}>
                                {this.props.children}
                            </ConfigProvider>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default connect(({ global }) => ({ global }))(BasicLayout);