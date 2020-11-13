import { Table } from 'antd';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';

export const TableMaterial: IMaterial = {
    name: '油涟表格 Table',
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
    project: '油涟后台',
    haveChildren: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'table' },
    ],
    ext: {
        code: {
            'index.js': {
                importDeclaration: {
                    antd: {
                        export: ['Table'],
                    },
                    './map': {
                        export: ['columns'],
                    },
                    behooks: {
                        export: ['useTable'],
                    },
                },
                methods: [
                    `const getData = ({ current, pageSize }, formData) => {
                        // return getList({
                        //     pageNum: current,
                        //     pageSize,
                        //     ...formData
                        // });
                        return new Promise((resolve) => {
                            resolve({
                                data: {{JSON.stringify(dataSource)}},
                                total: 2,
                            });
                        });
                    };`,
                    `const { tableProps{{hasMaterialByTag('ListFilter') ? ', search' : ''}} } = useTable(getData, {
                        form: {{hasMaterialByTag('ListFilter') ? 'formRef.current ? formRef.current.getForm() : false' : false}},
                    });`,
                    '{{hasMaterialByTag(\'ListFilter\') ? \'const { submit, reset } = search\' : \'\'}}',
                ],
            },
            'map.js': {
                codes: [
                    `export function columns({{ getModalLink().length > 0 ? 'methods' : '' }}) {
                        {{ getModalLink().length > 0 ? \`const { \${getModalLink().join(', ')} } = medhods\` : ''}}
                        return {{createFunctionString(columns)}};
                    }`,
                ],
            },
        },
    },
};
