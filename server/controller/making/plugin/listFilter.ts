import { IMaterial } from '../../../types/making';

/**
 * 处理filters组件
 */
export default function listFilter(material: IMaterial) {
    if (material.tag === 'ListFilter') {
        if (material.props.filters) {
            material.props.filtersFS = 'listFiltles()';
            delete material.props.filters;
        }
        if (material.props.formSet) {
            material.props.formSetFS = 'outherSet()';
            delete material.props.formSet;
        }
        if (material.props.outherSet) {
            material.props.outherSetFS = 'listFiltles()';
            delete material.props.outherSet;
        }
    }
}
