import React, { Component } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import Clipboard from 'clipboard';
import { GlobalModelState } from '@/models/global';
import TableCode from './components/TableCode';
import FormCode from './components/FormCode';
import ListPageCode from './components/ListPageCode';

interface IProps {
    global: GlobalModelState;
    dispatch: Function;
}

class Code extends Component<IProps, null> {
    clipboard: Clipboard;

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
        const { files, folders } = this.props.global;
        return (
            <div>
                <div className="template-list">
                    <TableCode files={files} updateFiles={this.updateFiles} />
                    <FormCode files={files} updateFiles={this.updateFiles} />
                    <ListPageCode folders={folders} />
                </div>
            </div>
        );
    }
}

export default connect(({ global }: { global: GlobalModelState }) => ({
    global,
}))(Code);
