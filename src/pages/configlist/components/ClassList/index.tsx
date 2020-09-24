import React from 'react';
import { Table, Modal, Input, message, Button } from 'antd';
import { GlobalModelState } from '@/models/global';
import { patchClass, delClass, addClass } from '@/services/configlist';
import { ColumnProps } from 'antd/es/table';
import { IClassItem } from '@/types/configlist';
import styles from './index.less';

interface IProps {
    global: GlobalModelState;
    dispatch: Function;
}

interface IState {
    classVisible: boolean;
    classItem: IClassItem;
}

const { confirm } = Modal;

class ClassList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            classItem: {
                id: '',
                name: '',
                value: '',
                display: false,
            },
            classVisible: false,
        };
    }

    columns: ColumnProps<IClassItem>[] = [
        {
            title: '类名',
            dataIndex: 'name',
        },
        {
            title: '操作',
            key: 'id',
            width: 160,
            render: record => (
                <>
                    <span className="opt-link" onClick={() => this.openClass(record)}>修改</span>
                    <span className="opt-link" onClick={() => this.hideClass(record)}>{record.display ? '隐藏' : '显示'}</span>
                    <span className="opt-link" onClick={() => this.delClass(record)}>删除</span>
                </>
            ),
        },
    ];

    /**
     * 获取class配置列表
     */
    getClassConfig() {
        this.props.dispatch({
            type: 'global/getClassList',
        });
    }

    /**
     * 打开class编辑弹窗
     */
    openClass(classItem: IClassItem) {
        this.setState({
            classItem,
            classVisible: true,
        });
    }

    /**
     * 关闭class编辑弹窗
     */
    closeClass = () => {
        this.setState({
            classVisible: false,
        });
    }

    /**
     * 编辑class
     */
    onChangeClass = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            classItem: {
                ...this.state.classItem,
                name: e.target.value,
            },
        });
    }

    /**
     * 编辑样式
     */
    onChangeStyle = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            classItem: {
                ...this.state.classItem,
                value: e.target.value,
            },
        });
    }

    /**
     * 确认修改/添加babel
     */
    confirmChangeClass = () => {
        const { classItem } = this.state;
        const { id, name, value, display } = classItem;
        if (id) {
            patchClass({
                id,
                name,
                value,
                display,
            }).then(() => {
                message.success('修改成功');
                this.closeClass();
                this.getClassConfig();
            });
        } else {
            addClass({
                name,
                value,
            }).then(() => {
                message.success('添加成功');
                this.closeClass();
                this.getClassConfig();
            });
        }
    }

    /**
     * 删除class
     */
    delClass({ id, name }: IClassItem) {
        confirm({
            title: '确认',
            content: `确定要删除 "${name}"`,
            onOk: () => {
                delClass({
                    id,
                }).then(() => {
                    message.success('删除成功');
                    this.getClassConfig();
                });
            },
        });
    }

    /**
     * 隐藏/显示class
     */
    hideClass = (classItem: IClassItem) => {
        const { id, name, value, display } = classItem;
        patchClass({
            id,
            name,
            value,
            display: !display,
        }).then(() => {
            message.success('修改成功');
            this.getClassConfig();
        });
    }

    componentDidMount() {
        this.getClassConfig();
    }

    render() {
        const { classList } = this.props.global;
        const { classItem, classVisible } = this.state;
        const { name, value } = classItem;

        return (
            <div>
                <div className={styles.classTop}>
                    <Button type="primary" size="small" onClick={() => { this.openClass({ id: '', name: '', value: '', display: false }); }}>新增</Button>
                </div>
                <Table columns={this.columns} dataSource={classList} rowKey="id" pagination={{ defaultPageSize: 5 }} />
                <Modal
                    visible={classVisible}
                    onCancel={this.closeClass}
                    onOk={this.confirmChangeClass}>
                    <div style={{ paddingTop: '20px' }}>
                        <Input style={{ marginBottom: '10px' }} autoFocus placeholder="请输入class" value={name} onChange={this.onChangeClass} />
                        <Input placeholder="请输入样式" value={value} onChange={this.onChangeStyle} />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ClassList;
