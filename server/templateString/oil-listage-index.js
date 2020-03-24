module.exports = function oilListpageIndex(name, title, namespace, buttons, isFilter, popupForms = []) {
    // 组件名
    const pageClassName = name.charAt(0).toUpperCase() + name.slice(1);

    // 头部组件jsx
    let headerJSX = '';
    if (buttons.length > 0) {
        headerJSX = `<SubHeader title="${title}">
    ${buttons.map(item => `                <Button type="primary">${item}</Button>`).join('\n    ')}
                </SubHeader>`;
    } else {
        headerJSX = `<SubHeader title="${title}" />`;
    }

    // 弹窗form对象
    let popupObject = '';
    if (popupForms.length > 0) {
        popupObject = popupForms.map(item => `const ${item.name}ModalProps = {
            modalForm: ${item.name}(this),
            modalKey: ${item.name}ModalKey,
            visible: ${item.name}Visible,
            title: '${item.title}',
            width: ${item.width},
            onCancel: this.${item.name}ModalCancel,
            onOk: this.${item.name}ModalSubmit,
        };`).join('\n        ');
    }

    // 弹窗form methods
    let popupMethods = '';
    if (popupForms.length > 0) {
        popupMethods = popupForms.map(item => `/**
    * 确认${item.name}弹窗
    */
    ${item.name}ModalSubmit = values => {
        this.${item.name}ModalCancel();
    }

    /**
    * 打开${item.name}弹窗
    */
    ${item.name}ModalOpen = () => {
        this.props.dispatch({
            type: '${namespace}/updateState',
            payload: {
                ${item.name}ModalKey: Math.random(),
                ${item.name}Visible: true,
            }
        });
    }

    /**
    * 关闭${item.name}弹窗
    */
    ${item.name}ModalCancel = () => {
        this.props.dispatch({
            type: '${namespace}/updateState',
            payload: {
                ${item.name}Visible: false,
            }
        });
    }`).join('\n\n   ');
    }

    // 弹窗form 变量
    let popupVariables = '';
    if (popupForms.length > 0) {
        popupVariables = popupForms.map(item => `${item.name}Visible,
            ${item.name}ModalKey,`).join('\n            ');
    }

    return `
import React from 'react';
import { connect } from 'dva';
import { ${buttons.length > 0 ? 'Button, ' : ''}Table } from 'antd';
import { ${isFilter ? 'listFilter, ' : ''}${popupForms.map(item => `${item.name}, `).join('')}listColumn } from './map';
import { ${isFilter ? 'ListFilter, ' : ''}${popupForms.length > 0 ? 'GenerateModal, ' : ''}SubHeader } from '@/components';
import { Global_Pagination } from '@/lib/enum';

class ${pageClassName} extends React.Component {
    ${isFilter ? `\n    searchHandel = (searchFormData) => {
        this.queryList({ pageNum: 1, searchFormData });
    };\n` : ''}
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

    ${popupMethods}

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
            ${popupVariables}
        } = ${namespace};
        const pagination = {
            ...Global_Pagination,
            total,
            current: pageNum,
            pageSize,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange
        };

        ${popupObject}
        return (
            <div className="bg-w">
                ${headerJSX}
                <div className="padding20">
                    ${isFilter ? '<ListFilter filters={listFilter(this)} onSearch={this.searchHandel} ref={el => this.listFilter = el} />' : ''}
                    <Table className="mt10" columns={listColumn(this)} dataSource={${namespace}.listData} pagination={pagination} rowKey={r => r.id} />
                </div>
                ${popupForms.map(item => `<GenerateModal {...${item.name}ModalProps} />`).join('\n                ')}
            </div>
        );
    }
}

export default connect(({ ${namespace} }) => ({ ${namespace} }))(${pageClassName});    
`;
};
