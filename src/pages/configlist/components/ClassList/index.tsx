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
    className: string;
    classId: string;
    classVisible: boolean;
    classValue: string;
}

const { confirm } = Modal;

class ClassList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            className: '',
            classId: '',
            classVisible: false,
            classValue: '',
        };
    }

    columns: ColumnProps<IClassItem>[] = [
        {
            title: '类名',
            dataIndex: 'name',
        },
        {
            title: '样式',
            dataIndex: 'value',
        },
        {
            title: '操作',
            key: 'id',
            width: 140,
            render: record => (
                <>
                    <span className="opt-link" onClick={() => this.openClass(record)}>修改</span>
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
    openClass({ id, name, value }: IClassItem) {
        this.setState({
            classId: id,
            className: name,
            classVisible: true,
            classValue: value,
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
            className: e.target.value,
        });
    }

    /**
     * 编辑样式
     */
    onChangeStyle = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            classValue: e.target.value,
        });
    }

    /**
     * 确认修改/添加babel
     */
    confirmChangeClass = () => {
        const { classId, className, classValue } = this.state;
        if (classId) {
            patchClass({
                id: classId,
                name: className,
                value: classValue,
            }).then(() => {
                message.success('修改成功');
                this.closeClass();
                this.getClassConfig();
            });
        } else {
            addClass({
                name: className,
                value: classValue,
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

    componentDidMount() {
        this.getClassConfig();
    }

    render() {
        const { classList } = this.props.global;
        const { className, classVisible, classValue } = this.state;

        return (
            <div>
                <div className={styles.classTop}>
                    <Button type="primary" size="small" onClick={() => { this.openClass({ id: '', name: '', value: '' }); }}>新增</Button>
                </div>
                <Table columns={this.columns} dataSource={classList} rowKey="id" pagination={{ defaultPageSize: 5 }} />
                <Modal
                    visible={classVisible}
                    onCancel={this.closeClass}
                    onOk={this.confirmChangeClass}>
                    <div style={{ paddingTop: '20px' }}>
                        <Input style={{ marginBottom: '10px' }} autoFocus placeholder="请输入class" value={className} onChange={this.onChangeClass} />
                        <Input placeholder="请输入样式" value={classValue} onChange={this.onChangeStyle} />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ClassList;
