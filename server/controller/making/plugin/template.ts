import GeneratorMaterial from '../generator/GeneratorMaterial';
import Generator from '../generator';
import { IMaterial } from '../../../types/making';

export default function template(material: IMaterial, generatorMaterial: GeneratorMaterial, generator: Generator) {
    Object.keys(material.props).forEach(key => {
        if (typeof material.props[key] === 'string') {
            // @ts-ignore
            with (generator) {
                material.props[key] = material.props[key].replace(/{{(.*?)}}/g, ($1, $2) => eval($2));
            }
        }
    });
}
