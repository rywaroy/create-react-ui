import { IMaterial } from '../../../types/making';

/**
 * 处理Table组件
 */
export default function table(material: IMaterial) {
    if (material.tag === 'Table') {
        delete material.props.dataSource;
        delete material.props.columns;
        material.props.columnsFS = 'columns()';
    }
}
