import * as React from 'react';
import { Form, TreeSelect, Input, InputNumber } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { TreeNode } from 'antd/es/tree-select';

interface IProps extends FormComponentProps {
    folders: TreeNode[];
}

interface IState {

}

class PageProps extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { folders } = this.props;

        return (
            <Form>
                <Form.Item label="导出文件夹">
                    {getFieldDecorator('url', {
                        rules: [
                            {
                                required: true,
                                message: '请填写导出文件夹',
                            },
                        ],
                    })(
                        <TreeSelect
                            showSearch
                            style={{ width: '100%' }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="请选择路径"
                            allowClear
                            treeData={folders}
                        />,
                    )}
                </Form.Item>
                <Form.Item label="页面名字">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: '请填写页面名字',
                            },
                            {
                                pattern: /^((?!\\|\/|:|\?|\*|"|<|>|\^).)*$/,
                                message: '请填写正确页面名字',
                            },
                        ],
                    })(<Input placeholder="请填写页面名字" />)}
                </Form.Item>
                <Form.Item label="namespace">
                    {
                        getFieldDecorator('namespace', {
                            rules: [
                                {
                                    required: true,
                                    message: '请填写页面空间命名',
                                },
                                {
                                    pattern: /^[a-zA-Z$_][a-zA-Z\d_]*$/,
                                    message: '请填写正确空间命名',
                                },
                            ],
                        })(<Input placeholder="请输入model namespace" />)
                    }
                </Form.Item>
                <Form.Item label="tab宽度">
                    {
                        getFieldDecorator('tabWith', {
                            initialValue: 4,
                        })(<InputNumber />)
                    }
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create<IProps>()(PageProps);
