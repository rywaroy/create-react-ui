import { IMaterial, IPageOtion } from '../../../types/making';

/**
 * 处理filters组件
 */
export default function listFilter(material: IMaterial) {
    if (material.tag === 'ListFilter') {
        if (material.props.filters && material.props.filters.length > 0) {
            material.props.filtersFS = 'listFilters()';
            delete material.props.filters;
        }
        const deleteProps = [];
        if (material.props.formSet && material.props.formSet.length > 0) {
            material.props.formSetFS = 'listFilters()';
        } else {
            deleteProps.push('listFilters');
        }
        delete material.props.formSet;
        if (material.props.otherSet && material.props.otherSet.length > 0) {
            material.props.otherSetFS = 'otherSet()';
        } else {
            deleteProps.push('otherSet');
        }
        delete material.props.otherSet;

        // 删除模板代码中的引用和导出
        if (deleteProps.length > 0 && material.project === '陆运通后台') {
            const exportList = material.ext.code['index.js'].importDeclaration['./map'].export;
            for (let i = exportList.length - 1; i >= 0; i--) {
                if (deleteProps.indexOf(exportList[i]) > -1) {
                    exportList.splice(i, 1);
                }
            }
            // 删完的情况
            if (exportList.length === 0) {
                delete material.ext.code['index.js'].importDeclaration['./map'];
            }

            const codeList = (material.ext.code['map.js'] as IPageOtion).codes;
            for (let i = codeList.length - 1; i >= 0; i--) {
                for (let j = 0; j < deleteProps.length; j++) {
                    if (codeList[i]) {
                        if (codeList[i].indexOf(deleteProps[j]) > -1) {
                            codeList.splice(i, 1);
                        }
                    }
                }
            }
            if (codeList.length === 0) {
                delete material.ext.code['map.js'];
            }
        }
    }
}
