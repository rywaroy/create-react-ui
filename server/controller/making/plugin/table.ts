import { IMaterial } from '../../../types/making';

/**
 * 处理Table组件
 */
export default function table(material: IMaterial) {
    if (material.tag === 'Table') {
        delete material.props.dataSource;
        const last = material.props.columns[material.props.columns.length - 1];
        if (last.key === 'action') {
            last.render = `() => (<>${last.opts.map((item) => (item.link
                ? `<a href="/" target="_blank" className="mr10">${item.text}</a>`
                : `<span className="opt-link">${item.text}</span>`)).join('')}</>)`;
            delete last.opts;
            material.copyProps.columns = material.props.columns;
        }
        delete material.props.columns;
        material.props.columnsFS = 'columns()';
    }
}
