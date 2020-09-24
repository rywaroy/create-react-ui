import { IMaterial } from '../../../types/making';

/**
 * 处理Form.Item组件
 */
export default function formitem(material: IMaterial) {
    if (material.tag === 'Form.Item') {
        if (material.children) {
            material.children.forEach(child => {
                child.props.getFieldDecorator = material.props.label;
            });
        }
    }
    if (material.props.getFieldDecorator) {
        const name = material.props.getFieldDecorator;
        this.on('before-create-startTag', () => {
            this.jsx += `{getFieldDecorator('${name}')(`;
        });
        this.on('after-create-jsx', () => {
            this.jsx += ')}';
        });
        delete material.props.getFieldDecorator;
    }
}
