import React, { Component } from 'react';
import { Terminal } from 'xterm';
import { TreeSelect, Button, message, Icon } from 'antd';
import { getFolder } from '@/services/file';
import socket from '@/utils/socket';
import { TreeNode } from 'antd/es/tree-select';
import styles from './index.less';

interface IState {
    value: string | undefined;
    treeData: TreeNode[];
    isBuilding: boolean;
}

class Publish extends Component<null, IState> {
    term: Terminal;

    constructor(props) {
        super(props);
        this.state = {
            value: undefined,
            treeData: [],
            isBuilding: false, // 是否正在构建
        };
    }

    /**
     * 获取文件夹目录
     */
    getFolder(base = '/') {
        getFolder({
            base,
        }).then(res => {
            const { list, svnBase } = res.data.data;
            this.setState({
                treeData: this.state.treeData.concat(list),
                value: svnBase,
            });
        });
    }

    /**
     * 异步加载数据
     */
    onLoadData = (treeNode: any) => new Promise(resolve => {
        const { id } = treeNode.props;
        getFolder({
            base: id,
        }).then(res => {
            this.setState({
                treeData: this.state.treeData.concat(res.data.data.list),
            }, () => resolve());
        });
    })

    onChange = (value: string) => {
        this.setState({ value });
    };

    /**
     * 发送构建请求
     */
    build = () => {
        if (!this.state.value) {
            message.error('请选择svn目录');
            return;
        }
        socket.emit('build', { svnBase: this.state.value });
    }

    /**
     * 清空终端
     */
    clear = () => {
        this.term.clear();
    }

    /**
     * 写入终端
     */
    writeln = (msg: string) => {
        this.term.writeln(msg);
    }

    /**
     * 修改创建状态
     */
    changeBuild = (isBuilding: boolean) => {
        this.setState({ isBuilding });
    }

    componentDidMount() {
        this.term = new Terminal({
            cols: 100,
        });
        this.term.open(document.getElementById('terminal'));
        socket.on('term-publish', this.writeln);
        socket.on('building', this.changeBuild);
        this.getFolder();
    }

    componentWillUnmount() {
        this.term.dispose();
        socket.removeEventListener('term-publish', this.writeln);
        socket.removeEventListener('building', this.changeBuild);
    }

    render() {
        const { treeData, value, isBuilding } = this.state;

        return (
            <div>
                <div className={styles.form}>
                    svn目录:
                    <TreeSelect
                        className={styles.treeSelect}
                        treeDataSimpleMode
                        value={value}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="请选择svn文件夹"
                        onChange={this.onChange}
                        loadData={this.onLoadData}
                        treeData={treeData} />
                </div>
                <Button type="primary" onClick={this.build} loading={isBuilding}>构建</Button>
                <div className={styles.terminalBox}>
                    <div className={styles.terminalTop}>
                        <Icon type="delete" className={styles.terminalDel} onClick={this.clear} />
                    </div>
                    <div id="terminal" />
                </div>

            </div>
        );
    }
}

export default Publish;
