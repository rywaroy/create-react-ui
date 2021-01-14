import fs from 'fs-extra';
import path from 'path';
import createMockFile from '../../mockData/create/createMockFile';
import appendMock from '../../mockData/create/appendMock';
import { IMaterial, IOpt } from '../../../types/making';
import Generator from '../generator';

/**
 * 处理Table组件
 */
export default function table(material: IMaterial, generator: Generator) {
    if (material.tag === 'Table') {
        // 创建mock
        if (material.props.mock && generator.isCreate) {
            const data = {};
            material.props.columns.forEach(item => {
                data[item.dataIndex] = '@ctitle';
            });
            const mockObject = {
                code: '200',
                count: '50',
                result: 'success',
                'data|10': [data],
            };
            const baseUrl = material.project === '陆运通后台' ? '/marketingScoreNode/proxy/tradeManager' : '/oilChainBoss';
            const url = `/${generator.namespace}/list`;
            const APIPath = path.join(process.cwd(), './mock/api.js');
            fs.stat(APIPath, (err, stats) => {
                if (!err && stats.isFile()) {
                    appendMock({
                        mockObject,
                        method: 'GET',
                        path: path.join('mock', 'api.js'),
                        baseUrl,
                        url,
                    });
                } else {
                    createMockFile({
                        mockObject,
                        method: 'GET',
                        path: 'mock',
                        baseUrl,
                        url,
                        fileName: 'api.js',
                    });
                }
            });
        }
        delete material.props.mock;

        delete material.props.dataSource;
        const last = material.props.columns[material.props.columns.length - 1];
        let methods = [];
        if (last.key === 'action') {
            if (material.project === '陆运通后台') {
                last.render = `(record) => (<TableOpt>${last.opts.map((item: IOpt) => (
                    `<TableOpt.Item${item.linkModal ? ` onClick={() => ${item.linkModal}Open(record)}` : ''} ${item.link ? 'type="link" target="_blank"' : ''}>${item.text}</TableOpt.Item>`)).join('')}</TableOpt>),`;
            } else if (material.project === '油涟后台') {
                last.render = `(record) => { const buttons = []; ${last.opts.map((item: IOpt) => (`buttons.push({ name: '${item.text}', ${item.linkModal ? `method: ${item.linkModal}Open` : ''} });`))} return ( <TableBtns buttons={buttons} record={record} /> );},`;
            } else {
                last.render = `(record) => (<>${last.opts.map((item: IOpt) => (item.link
                    ? `<a href="/" target="_blank" className="mr10">${item.text}</a>`
                    : `<span className="opt-link"${item.linkModal ? ` onClick={() => ${item.linkModal}Open(record)}` : ''}>${item.text}</span>`)).join('')}</>)`;
            }
            methods = last.opts.filter((item: IOpt) => item.linkModal).map((item: IOpt) => `${item.linkModal}Open`);
            material.ext.modalMethods = methods;
            delete last.opts;
            material.copyProps.columns = material.props.columns;
        }
        delete material.props.columns;
        material.props.columnsFS = `columns(${methods.length > 0 ? `{${methods.join(', ')}}` : ''})`;

        if (material.project === '陆运通后台') {
            // 处理scroll
            if (material.props.scroll) {
                material.props.scrollFS = `{ x: ${material.props.scroll.x}, y: height }`;
                delete material.props.scroll;
            } else {
                material.props.scrollFS = '{ y: height }';
            }
        }
    }
}
