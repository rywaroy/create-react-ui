import { IMaterial } from '../../../types/making';

/**
 * 处理filters组件
 */
export default function listFilter(material: IMaterial) {
    if (material.tag === 'ListFilter') {
        if (material.props.filters && material.props.filters.length > 0) {
            material.props.filtersFS = 'listFilters()';
            delete material.props.filters;
        }
        if (material.props.formSet && material.props.formSet.length > 0) {
            material.props.formSetFS = 'listFilters()';
        }
        delete material.props.formSet;
        if (material.props.otherSet && material.props.otherSet.length > 0) {
            material.props.otherSetFS = 'otherSet()';
        }
        delete material.props.otherSet;
    }
}
