import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import MenuBox from '@/components/MenuBox';

const { Content, Sider } = Layout;

class BasicLayout extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'global/updateFiles'
        });
        window.socket.on('set-files', files => {
            console.log(files);
            this.props.dispatch({
                type: 'global/updateState',
                payload: {
                    files,
                }
            });
        });
        window.socket.on('set-folders', folders => {
            this.props.dispatch({
                type: 'global/updateState',
                payload: {
                    folders,
                }
            });
        });
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
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default connect(({ global }) => ({ global }))(BasicLayout);