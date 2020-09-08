import { IMaterial } from '../../../types/making';

/**
 * 处理GenerateModal组件
 */
export default function generateModal(material: IMaterial) {
    if (material.tag === 'GenerateModal') {
        delete material.props.visible;
        delete material.props.modalName;
        delete material.props.modalForm;
    }
}
