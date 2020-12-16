import { Table } from 'antd';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';

export const LytTableMaterial: IMaterial = {
    name: '陆运通表格 Table',
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
        bordered: true,
        rowClassName: (record, index) => {
            if (index % 2 === 1) {
                return 'zebra-highlight';
            }
            return '';
        },
        rowClassNameFS: `(record, index) => {
            if (index % 2 === 1) {
                return 'zebra-highlight';
            }
            return '';
        }`,
    },
    project: '陆运通后台',
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
                        export: ['useTableHeight', 'useStore'],
                    },
                    './hooks/useData': {
                        default: 'useData',
                    },
                    react: {
                        export: ['useRef'],
                    },
                },
                state: {
                    formData: {},
                    pageSize: 10,
                    current: 1,
                },
                methods: [
                    `// table 逻辑
                    const { tableProps, {{hasMaterialByTag('ListFilter') ? 'search' : ''}} } = useData(store{{hasMaterialByTag('ListFilter') ? ', formRef' : ''}});
                    {{hasMaterialByTag('ListFilter') ? 'const { submit, reset } = search' : ''}}`,
                    'const height = useTableHeight()',
                ],
            },
            'map.js': {
                importDeclaration: {
                    '@/components/TableOpt': {
                        default: 'TableOpt',
                    },
                },
                codes: [
                    `export function columns({{ getModalLink().length > 0 ? 'methods' : '' }}) {
                        {{ getModalLink().length > 0 ? \`const { \${getModalLink().join(', ')} } = methods\` : ''}}
                        return {{createFunctionString(columns)}};
                    }`,
                ],
            },
            './hooks/useData.js': {
                importDeclaration: {
                    behooks: {
                        export: ['useTable'],
                    },
                },
                codes: [
                    `export default function useData(store{{hasMaterialByTag('ListFilter') ? ', formRef' : ''}}) {
                        const [state, setState] = store;
                        const { formData, pageSize, current } = state;
                      
                        const getData = ({ current, pageSize }, formData) => {
                            setState({
                                formData,
                                pageSize,
                                current,
                            });
                        //   return getList({
                        //     data: {
                        //       pageNo: current,
                        //       pageSize,
                        //       ...formData,
                        //     },
                        //   });
                            return new Promise((resolve) => {
                                resolve({
                                    data: {{JSON.stringify(dataSource)}},
                                    total: 2,
                                });
                            });
                        };
                        
                        return useTable(getData, {
                          form: {{hasMaterialByTag('ListFilter') ? 'formRef.current ? formRef.current.getForm() : false,' : 'false,'}}
                          defaultParams: [{ pageSize, current }, formData],
                        });
                      }`,
                ],
            },
        },
    },
};
