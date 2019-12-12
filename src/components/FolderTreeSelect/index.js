import React, { Component } from 'react';
import { TreeSelect } from 'antd';

const { TreeNode } = TreeSelect;

class FolderTreeSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    onChange = value => {
        this.setState({
            value
        });
        this.props.onChange && this.props.onChange(value);
    }

    render() {
        return (
            <TreeSelect
                showSearch
                style={{ width: '100%' }}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择路径"
                allowClear
                onChange={this.onChange}
                treeData={this.props.folders}
            />
        );
    }
}

export default FolderTreeSelect;