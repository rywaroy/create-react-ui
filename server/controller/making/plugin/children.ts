import GeneratorMaterial from '../generator/GeneratorMaterial';
import { IMaterial } from '../../../types/making';

export default function children(material: IMaterial, generatorMaterial: GeneratorMaterial) {
    if (material.props.children) {
        const child = material.props.children[0];
        delete material.props.children;
        generatorMaterial.on('after-create-startTag', () => {
            generatorMaterial.jsx += child;
        });
    }
}
