import React from 'react';
import { Button } from 'antd';
import { ISetFormValues } from '@/types/code';
import { IMaterial } from '@/types/making';
import GenerateForm from '../GenerateForm';
import materialWrap from '../MaterialWrap';
import styles from './index.less';

interface IProps {
    className: string;
    btnsClassName: string;
    filters: ISetFormValues[];
    hasSearchBtn: boolean;
    hasResetBtn: boolean;
    searchBtnText: string;
    resetBtnText: string;
    onSearch: (values: any) => void;
    onReset: () => void;
}

export default class ListFilter extends React.Component<IProps, any> {
    listFilter: any;

    /* 搜索 */
    onSearch = () => {
        this.listFilter.verify((error, values) => {
            if (error) {
                return;
            }
            this.props.onSearch && this.props.onSearch(values);
        });
    };

    /* 重置 */
    onReset = () => {
        this.getForm().resetFields();

        /* 对外暴露reset方法 */
        this.props.onReset && this.props.onReset();
    };

    /* 对外暴露Form的实例 */
    getForm = () => this.listFilter.getForm();

    render() {
        const {
            className = '',
            btnsClassName = '',
            filters,
            hasSearchBtn = true,
            hasResetBtn = true,
            searchBtnText = '查询', /* 搜索按钮文案 */
            resetBtnText = '清除', /* 清除按钮文案 */
        } = this.props;

        /* 搜索列表如果没有设置, 默认为一行3个 */
        filters.forEach(item => {
            if (!item.span) {
                item.span = 8;
            }
        });

        return (
            <div>
                <div className={`${styles.listFilterWrap} ${className}`}>
                    <GenerateForm formSet={filters} wrappedComponentRef={el => { this.listFilter = el; }} />
                    <div className={`${styles.btnGroup} ${btnsClassName}`}>
                        {hasSearchBtn && <Button type="primary" onClick={this.onSearch}>{searchBtnText}</Button>}
                        {hasResetBtn && <Button type="default" onClick={this.onReset}>{resetBtnText}</Button>}
                    </div>
                </div>
            </div>
        );
    }
}

export const ListFilterMaterial: IMaterial = {
    name: '列表筛选表单',
    tag: 'ListFilter',
    from: '@/components',
    id: Math.random(),
    component: materialWrap(ListFilter),
    intro: '列表筛选表单组件',
    props: {
        filters: [],
        refFS: 'formRef',
        onSearchFS: 'submit',
        onResetFS: 'reset',
    },
    haveChildren: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'form', props: { propName: 'filters' } },
    ],
    project: '油涟后台',
    ext: {
        code: {
            'index.js': {
                importDeclaration: {
                    react: {
                        export: ['useRef'],
                    },
                    './map': {
                        export: ['listFilters'],
                    },
                    '@/components': {
                        export: ['ListFilter'],
                    },
                },
                variableDeclarator: [
                    'const formRef = useRef(null);',
                ],
            },
            'map.js': {
                codes: [
                    `export function listFilters() {
                        return {{JSON.stringify(filters)}};
                    }`,
                ],
            },
        },
    },
};
