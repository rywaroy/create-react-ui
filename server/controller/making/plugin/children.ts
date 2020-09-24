import { IMaterial } from '../../../types/making';

/**
 * 处理children属性
 */
export default function children(material: IMaterial) {
    if (material.props.children) {
        const child = typeof material.props.children === 'string' ? material.props.children : material.props.children[0];
        delete material.props.children;
        this.on('after-create-startTag', () => {
            this.jsx += child;
        });
    }
}
