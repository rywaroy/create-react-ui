import { IMaterial } from '../../../types/making';

/**
 * 处理filters组件
 */
export default function listFilter(material: IMaterial) {
    if (material.tag === 'ListFilter') {
        delete material.props.filters;
        material.props.filtersFS = 'listFiltles()';
    }
}
