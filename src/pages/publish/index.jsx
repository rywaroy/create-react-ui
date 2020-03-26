import React, { Component } from 'react';
import { Terminal } from 'xterm';
import { TreeSelect } from 'antd';
import { getFolder } from '@/services/file';

class Publish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: undefined,
            treeData: [],
        };
    }

    /**
     * 获取文件夹目录
     */
    getFolder(base = '/') {
        getFolder({
            base,
        }).then(res => {
            this.setState({
                treeData: this.state.treeData.concat(res.data.data),
            });
        });
    }

    componentDidMount() {
        this.term = new Terminal();
        this.term.open(document.getElementById('terminal'));
        window.socket.on('term', msg => {
            this.term.write(msg);
        });
        this.getFolder();
    }

    render() {
        const { treeData, value } = this.state;

        return (
            <div>
                <TreeSelect
                    treeDataSimpleMode
                    style={{ width: '100%' }}
                    value={value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    treeData={treeData}
                />
                <div id="terminal" className="terminal" />
            </div>
        );
    }
}

export default Publish;
