import { IMaterial } from '../../../types/making';
import GeneratorMaterial from '../generator/GeneratorMaterial';

/**
 * 处理Form.Item组件
 */
export default function formitem(material: IMaterial, generatorMaterial: GeneratorMaterial) {
    if (material.tag === 'Form.Item') {
        if (material.children) {
            material.children.forEach(child => {
                child.props.getFieldDecorator = material.props.label;
            });
        }
    }
    if (material.props.getFieldDecorator) {
        const name = material.props.getFieldDecorator;
        generatorMaterial.on('before-create-startTag', () => {
            generatorMaterial.jsx += `{getFieldDecorator('${name}')(`;
        });
        generatorMaterial.on('after-create-jsx', () => {
            generatorMaterial.jsx += ')}';
        });
        delete material.props.getFieldDecorator;
    }
}
