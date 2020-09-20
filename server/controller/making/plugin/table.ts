import { IMaterial, IOpt } from '../../../types/making';

/**
 * 处理Table组件
 */
export default function table(material: IMaterial) {
    if (material.tag === 'Table') {
        delete material.props.dataSource;
        const last = material.props.columns[material.props.columns.length - 1];
        let methods = [];
        if (last.key === 'action') {
            last.render = `(record) => (<>${last.opts.map((item: IOpt) => (item.link
                ? `<a href="/" target="_blank" className="mr10">${item.text}</a>`
                : `<span className="opt-link"${item.linkModal ? ` onClick={() => ${item.linkModal}Open(record)}` : ''}>${item.text}</span>`)).join('')}</>)`;
            methods = last.opts.filter((item: IOpt) => item.linkModal).map((item: IOpt) => `${item.linkModal}Open`);
            material.ext.modalMethods = methods;
            delete last.opts;
            material.copyProps.columns = material.props.columns;
        }
        delete material.props.columns;
        material.props.columnsFS = `columns(${methods.length > 0 ? `{${methods.join(', ')}}` : ''})`;
    }
}
