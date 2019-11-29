import React, { Component } from 'react';
import { TreeSelect } from 'antd';

const { TreeNode } = TreeSelect;

class FolderTreeSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
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
            >
                {
                    this.props.folders.map(folder => (
                        <TreeNode value={folder.value} title={folder.title} key={folder.key}>
                            {
                                folder.children &&
                                    folder.children.map(child => (
                                        <TreeNode value={child.value} title={child.title} key={child.key}></TreeNode>
                                    ))
                            }
                        </TreeNode>
                    ))
                }
            </TreeSelect>
        );
    }
}

export default FolderTreeSelect;