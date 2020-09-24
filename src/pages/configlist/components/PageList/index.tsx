import React from 'react';
import { Table, Modal, message } from 'antd';
import { getPageList, delPageList } from '@/services/making';
import { ColumnProps } from 'antd/es/table';
import { IPageItem } from '@/types/configlist';

interface IProps {

}

interface IState {
    pageList: IPageItem[]
}

const { confirm } = Modal;

class PageList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            pageList: [],
        };
    }

    columns: ColumnProps<IPageItem>[] = [
        {
            title: '类名',
            dataIndex: 'title',
        },
        {
            title: '操作',
            key: 'id',
            width: 140,
            render: record => (
                <>
                    <span className="opt-link" onClick={() => this.delPageList(record)}>删除</span>
                </>
            ),
        },
    ];

    /**
     * 获取pageList列表
     */
    getPageList() {
        getPageList()
            .then(res => {
                this.setState({
                    pageList: res.data.data,
                });
            });
    }

    /**
     * 删除class
     */
    delPageList({ id, title }: IPageItem) {
        confirm({
            title: '确认',
            content: `确定要删除 "${title}"`,
            onOk: () => {
                delPageList({
                    id,
                }).then(() => {
                    message.success('删除成功');
                    this.getPageList();
                });
            },
        });
    }

    componentDidMount() {
        this.getPageList();
    }

    render() {
        const { pageList } = this.state;

        return (
            <div>
                <Table columns={this.columns} dataSource={pageList} rowKey="id" pagination={{ defaultPageSize: 5 }} />
            </div>
        );
    }
}

export default PageList;
