module.exports = function oilListpageIndex(name, title, namespace, buttons, isFilter) {
    // 组件名
    const pageClassName = name.charAt(0).toUpperCase() + name.slice(1);

    // 头部组件jsx
    let headerJSX = '';
    if (buttons.length > 0) {
        headerJSX = `<SubHeader title="${title}">
    ${buttons.map(item => `<Button type="primary">${item}</Button>`).join('')}
</SubHeader>`;
    } else {
        headerJSX = `<SubHeader title="${title}" />`;
    }

    return `
import React from 'react';
import { connect } from 'dva';
import { ${buttons.length > 0 ? 'Button, ' : ''}Table } from 'antd';
import { ${isFilter ? 'listFilter, ' : ''}listColumn } from './map';
import { ${isFilter ? 'ListFilter, ' : ''}SubHeader } from '@/components';
import { Global_Pagination } from '@/lib/enum';

class ${pageClassName} extends React.Component {

    ${isFilter ? `searchHandel = (searchFormData) => {
        this.queryList({ pageNum: 1, searchFormData });
    };` : ''}
    
    /**
     * 查询列表
     * @param {Object} params - 查询参数对象
     */
    queryList(params = {}) {
        this.props.dispatch({
            type: '${namespace}/updateStateCall',
            payload: { ...params },
        }).then(() => {
            this.props.dispatch({ type: '${namespace}/queryList' });
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
        this.props.dispatch({ type: '${namespace}/resetState' });
    }

    componentDidMount() {
        this.queryList();
    }

    render() {
        const { ${namespace} } = this.props;
        const {
            total,
            pageNum,
            pageSize,
        } = ${namespace};
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
                ${headerJSX}
                <div className="padding20">
                    ${isFilter ? '<ListFilter filters={listFilter(this)} onSearch={this.searchHandel} ref={el => this.listFilter = el} />' : ''}
                    <Table className="mt10" columns={listColumn(this)} dataSource={${namespace}.listData} pagination={pagination} rowKey={r => r.partyId} />
                </div>
            </div>
        );
    }
}

export default connect(({ ${namespace} }) => ({ ${namespace} }))(${pageClassName});    
`;
};
