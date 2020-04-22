import React, { Component } from 'react';
import { connect } from 'dva';
import { Terminal } from 'xterm';
import { TreeSelect, Form, Button, Icon, Upload, message } from 'antd';
import { isFolder, isJsOrFolder } from '@/services/file';
import styles from './index.less';

const { Dragger } = Upload;

class Doucument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreateing: false, // 是否正在构建
            output: '',
        };
    }

    /**
     * 验证是否是文件夹
     */
    isFolder = (rule, value, callback) => {
        isFolder({
            url: value,
        }).then(() => {
            callback();
            this.setState({
                output: value,
            });
        }).catch(err => {
            callback(err);
        });
    };

    /**
     * 验证是否是js文件或者文件夹
     */
    isJsOrFolder = (rule, value, callback) => {
        isJsOrFolder({
            url: value,
        }).then(() => {
            callback();
        }).catch(err => {
            callback(err);
        });
    };

    /**
     * 发起创建文档
     */
    create = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { entry, output } = values;
                window.socket.emit('create-document', {
                    entry,
                    output,
                });
            }
        });
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
    writeln = msg => {
        this.term.writeln(msg);
    }

    /**
     * 修改创建状态
     */
    changeCreate = isCreateing => {
        this.setState({ isCreateing });
    }

    beforeUpload = () => {
        if (!this.state.output) {
            message.error('请选择文档输出路径');
            return false;
        }
        return true;
    }

    componentDidMount() {
        this.term = new Terminal();
        this.term.open(document.getElementById('terminal'));
        window.socket.on('term-document', this.writeln);
        window.socket.on('createing', this.changeCreate);
    }

    componentWillUnmount() {
        this.term.dispose();
        window.socket.removeEventListener('term-document', this.writeln);
        window.socket.removeEventListener('createing', this.changeCreate);
    }

    render() {
        const { files } = this.props.global;
        const { getFieldDecorator } = this.props.form;
        const { isCreateing, output } = this.state;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 14 },
        };

        const props = {
            name: 'file',
            action: 'http://localhost:2019/api/document/create',
            data: {
                output,
            },
            beforeUpload: this.beforeUpload,
        };

        return (
            <div>
                <div className={styles.top}>
                    <div className={styles.form}>
                        <Form {...formItemLayout}>
                            <Form.Item label="文件构建目录">
                                {
                                    getFieldDecorator('entry', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请选择文件构建目录',
                                            },
                                            {
                                                validator: this.isJsOrFolder,
                                            },
                                        ],
                                    })(
                                        <TreeSelect
                                            showSearch
                                            style={{ width: '400px' }}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder="请选择路径"
                                            allowClear
                                            treeData={files} />,
                                    )
                                }
                            </Form.Item>
                            <Form.Item label="文档输出目录">
                                {
                                    getFieldDecorator('output', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请选择文档输出目录',
                                            },
                                            {
                                                validator: this.isFolder,
                                            },
                                        ],
                                    })(
                                        <TreeSelect
                                            showSearch
                                            style={{ width: '400px' }}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder="请选择路径"
                                            allowClear
                                            treeData={files} />,
                                    )
                                }
                            </Form.Item>
                            <Form.Item label=" " colon={false}>
                                <Button type="primary" onClick={this.create} loading={isCreateing}>生成</Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={styles.upload}>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">拖拽上传</p>
                            <p className="ant-upload-hint">只支持单文件，上传前先选择好输出目录</p>
                        </Dragger>
                    </div>
                </div>

                <div className={styles.terminalTop}>
                    <Icon type="delete" className={styles.terminalDel} onClick={this.clear} />
                </div>
                <div id="terminal" />

            </div>
        );
    }
}

export default connect(({ global }) => ({ global }))(Form.create()(Doucument));
