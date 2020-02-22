import React, { Component } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import TableCode from './components/TableCode';
import FormCode from './components/FormCode';
import Clipboard from 'clipboard';

class Code extends Component {
    componentDidMount() {
        this.clipboard = new Clipboard('#code');
        this.clipboard.on('success', () => {
            message.success('复制成功');
        });
        this.clipboard.on('error', () => {
            message.error('复制失败');
        });
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    updateFiles = () => {
        this.props.dispatch({
            type: 'global/updateFiles',
        });
    };

    render() {
        const { files } = this.props.global;
        return (
            <div>
                <div className="template-list">
                    <TableCode files={files} updateFiles={this.updateFiles} />
                    <FormCode files={files} updateFiles={this.updateFiles} />
                </div>
            </div>
        );
    }
}

export default connect(({ global }) => ({ global }))(Code);
