import { Table } from 'antd';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';

export const TableMaterial: IMaterial = {
    name: '表格 Table',
    tag: 'Table',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(Table),
    intro: 'antd 表格组件',
    props: {
        columns: [
            { title: '属性1', dataIndex: '属性1' },
            { title: '属性2', dataIndex: '属性2' },
            { title: '属性3', dataIndex: '属性3' },
            { title: '属性4', dataIndex: '属性4' },
            { title: '属性5', dataIndex: '属性5' },
        ],
        dataSource: [
            { 属性1: '测试数据', 属性2: '测试数据', 属性3: '测试数据', 属性4: '测试数据', 属性5: '测试数据', id: 1 },
            { 属性1: '测试数据', 属性2: '测试数据', 属性3: '测试数据', 属性4: '测试数据', 属性5: '测试数据', id: 2 },
        ],
        rowKey: 'id',
        expansion: '{...tableProps}',
    },
    haveChildren: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'table' },
    ],
    ext: {
        code: {
            index: {
                import: {
                    antd: {
                        export: 'Table',
                    },
                    './map': {
                        export: 'columns',
                    },
                    '@/hooks': {
                        export: 'useAntdTable',
                    },
                },
                methods: [
                    `const getData = ({ current, pageSize }, formData) => {
                        return queryCompanyOilCardList({
                            pageNum: current,
                            pageSize,
                            ...formData
                        });
                    };`,
                    `const { tableProps, search, run, refresh } = useAntdTable(getData, {
                        form: {{hasMaterialByTag('ListFilter') ? 'formRef.current ? formRef.current.getForm() : false' : false}},
                        formatResult: (res) => {
                            return {
                                list: res.data,
                                total: res.count,
                            };
                        },
                    });`,
                    'const { submit, reset } = search',
                ],
            },
        },
    },
};
