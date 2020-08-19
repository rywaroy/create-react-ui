import React, { Component } from 'react';
import { Layout, ConfigProvider, notification, Icon } from 'antd';
import { connect } from 'dva';
import 'antd/dist/antd.css';
import 'xterm/css/xterm.css';
import zhCN from 'antd/es/locale/zh_CN';
import MenuBox from '@/components/MenuBox';
import { GlobalModelState } from '@/models/global';
import LabelBox from '@/components/LabelBox';
import socket from '@/utils/socket';

const { Content, Sider } = Layout;

interface IProps {
    global: GlobalModelState;
    dispatch: Function;
}

class BasicLayout extends Component<IProps, null> {
    /**
     * 打开关闭label盒子
     */
    openBox = () => {
        const { labelShow } = this.props.global;
        this.props.dispatch({
            type: 'global/updateState',
            payload: {
                labelShow: !labelShow,
            },
        });
    }

    /**
     * 菜单收缩
     */
    onCollapse = (collapsed: boolean) => {
        this.props.dispatch({
            type: 'global/updateState',
            payload: {
                collapsed,
            },
        });
    };

    componentDidMount() {
        this.props.dispatch({
            type: 'global/updateFiles',
        });
        this.props.dispatch({
            type: 'global/getLabelConfig',
        });
        this.props.dispatch({
            type: 'global/getClassList',
        });
        socket.on('msg', data => {
            notification.open({
                message: data.msg,
                icon: data.status === 200 ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> : <Icon type="close-circle" style={{ color: 'red' }} />,
            });
        });
        setInterval(() => {
            socket.emit('heart-link');
        }, 10000);
    }

    render() {
        const { labelDisplay, labelShow, labelList, collapsed } = this.props.global;

        return (
            <Layout style={{ height: '100%', minWidth: 1200 }}>
                <Layout>
                    <Sider
                        collapsible
                        collapsedWidth={64}
                        collapsed={collapsed}
                        width={200}
                        style={{ background: '#30303d' }}
                        onCollapse={this.onCollapse}>
                        {
                            collapsed ? <div style={{ height: '120px' }} /> : <div className="logo" />
                        }
                        <MenuBox />
                    </Sider>
                    <Layout style={{ background: '#23232e' }}>
                        <Content
                            style={{
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
                {
                    labelDisplay
                    && (
                        <LabelBox labelShow={labelShow} labelList={labelList} openBox={this.openBox} />
                    )
                }
            </Layout>
        );
    }
}

export default connect(({ global }: { global: GlobalModelState }) => ({ global }))(BasicLayout);
