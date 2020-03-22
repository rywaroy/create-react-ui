module.exports = function oilListpageIndex(name) {
    // 组件名
    const pageClassName = name.charAt(0).toUpperCase() + name.slice(1);


    return `
import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import { listFilter, listColumn } from './map';
import { ListFilter, SubHeader } from '@/components';
import { Global_Pagination } from '@/lib/enum';

class ${pageClassName} extends React.Component {

    searchHandel = (searchFormData) => {
        this.queryList({ pageNum: 1, searchFormData });
    };

    /**
     * 查询列表
     * @param {Object} params - 查询参数对象
     */
    queryList(params = {}) {
        this.props.dispatch({
            type: 'accountDriver/updateStateCall',
            payload: { ...params },
        }).then(() => {
            this.props.dispatch({ type: 'accountDriver/queryList' });
        });
    }

    /**
     * 页码切换
     * @param {Number} page - 页码
     */
    onPageChange = (page) => {
        this.queryList({ pageNum: page });
    }

    /**
     * 页码变化
     * @param {Number} current - 当前页数
     * @param {Number} size - 分页尺寸
     */
    onShowSizeChange = (current, size) => {
        this.queryList({ pageNum: current, pageSize: size });
    }

    componentWillUnmount() {
        this.props.dispatch({ type: 'accountDriver/resetState' });
    }

    componentDidMount() {
        this.queryList();
    }

    render() {
        const { accountDriver } = this.props;
        const {
            total,
            pageNum,
            pageSize,
        } = accountDriver;
        const pagination = {
            ...Global_Pagination,
            total,
            current: pageNum,
            pageSize,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange
        };

        return (
            <div className="bg-w">
                <div className="padding20">
                    <ListFilter filters={listFilter(this)} onSearch={this.searchHandel} ref={el => this.listFilter = el}/>
                    <Table className="mt10" columns={listColumn(this)} dataSource={accountDriver.listData} pagination={pagination} rowKey={r => r.partyId} />
                </div>
            </div>
        );
    }
}

export default connect(({ accountDriver }) => ({ accountDriver }))(${pageClassName});    
`;
};
