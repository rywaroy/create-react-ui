import GeneratorMaterial from '../generator/GeneratorMaterial';
import { IMaterial } from '../../../types/making';

/**
 * 处理children属性
 */
export default function children(material: IMaterial, generatorMaterial: GeneratorMaterial) {
    if (material.props.children) {
        const child = typeof material.props.children === 'string' ? material.props.children : material.props.children[0];
        delete material.props.children;
        generatorMaterial.on('after-create-startTag', () => {
            generatorMaterial.jsx += child;
        });
    }
}
