import { IMaterial } from '../../../types/making';

/**
 * 处理GenerateModal组件
 */
export default function generateModal(material: IMaterial) {
    if (material.tag === 'GenerateModal' || material.tag === 'Modal') {
        delete material.props.visible;
        delete material.props.modalName;
        delete material.props.modalForm;
        if (material.props.extraComponent) {
            // 额外导入组件删除expansion、ref属性
            delete material.props.expansion;
            delete material.props.refFS;
        }
    }
}
