import React from 'react';
import { Table, Modal, Input, message, Button } from 'antd';
import { GlobalModelState } from '@/models/global';
import { patchLabelConfig, delLabelConfig, addLabelConfig } from '@/services/configlist';
import { ColumnProps } from 'antd/es/table';
import { ILabelItem } from '@/types/configlist';
import styles from './index.less';

interface IProps {
    global: GlobalModelState;
    dispatch: Function;
}

interface IState {
    labelName: string;
    labelId: string;
    labelVisible: boolean;
}

const { confirm } = Modal;

class LabelList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            labelName: '',
            labelId: '',
            labelVisible: false,
        };
    }

    columns: ColumnProps<ILabelItem>[] = [
        {
            title: 'label',
            dataIndex: 'name',
        },
        {
            title: '操作',
            key: 'id',
            width: 140,
            render: record => (
                <>
                    <span className="opt-link" onClick={() => this.openLabel(record)}>修改</span>
                    <span className="opt-link" onClick={() => this.delLabel(record)}>删除</span>
                </>
            ),
        },
    ];

    /**
     * 获取label配置列表
     */
    getLabelConfig() {
        this.props.dispatch({
            type: 'global/getLabelConfig',
        });
    }

    /**
     * 打开label编辑弹窗
     */
    openLabel({ id, name }: ILabelItem) {
        this.setState({
            labelId: id,
            labelName: name,
            labelVisible: true,
        });
    }

    /**
     * 关闭label编辑弹窗
     */
    closeLabel = () => {
        this.setState({
            labelVisible: false,
        });
    }

    /**
     * 编辑label
     */
    onChangeLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            labelName: e.target.value,
        });
    }

    /**
     * 确认修改/添加babel
     */
    confirmChangeLabel = () => {
        const { labelId, labelName } = this.state;
        if (labelId) {
            patchLabelConfig({
                id: labelId,
                name: labelName,
            }).then(() => {
                message.success('修改成功');
                this.closeLabel();
                this.getLabelConfig();
            });
        } else {
            addLabelConfig({
                name: labelName,
            }).then(() => {
                message.success('添加成功');
                this.closeLabel();
                this.getLabelConfig();
            });
        }
    }

    /**
     * 删除label
     */
    delLabel({ id, name }: ILabelItem) {
        confirm({
            title: '确认',
            content: `确定要删除 "${name}"`,
            onOk: () => {
                delLabelConfig({
                    id,
                }).then(() => {
                    message.success('删除成功');
                    this.getLabelConfig();
                });
            },
        });
    }

    render() {
        const { labelList } = this.props.global;
        const { labelName, labelVisible } = this.state;

        return (
            <div>
                <div className={styles.labelTop}>
                    <Button type="primary" size="small" onClick={() => { this.openLabel({ id: '', name: '' }); }}>新增</Button>
                </div>
                <Table columns={this.columns} dataSource={labelList} rowKey="id" pagination={{ defaultPageSize: 5 }} />
                <Modal
                    visible={labelVisible}
                    onCancel={this.closeLabel}
                    onOk={this.confirmChangeLabel}>
                    <div style={{ paddingTop: '20px' }}>
                        <Input autoFocus placeholder="请输入label" maxLength={10} value={labelName} onChange={this.onChangeLabel} />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default LabelList;
