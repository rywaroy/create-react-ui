import GeneratorMaterial from '../generator/GeneratorMaterial';
import Generator from '../generator';
import { IMaterial } from '../../../types/making';

export default function template(material: IMaterial, generatorMaterial: GeneratorMaterial, generator: Generator) {
    Object.keys(material.props).forEach(key => {
        if (typeof material.props[key] === 'string') {
            material.props[key] = change(material.props[key]);
        }
    });
    function deep(object) {
        if (typeof object === 'string') {
            return change(object);
        } if (Array.isArray(object)) {
            return object.map(item => deep(item));
        }
        Object.keys(object).forEach(key => {
            object[key] = deep(object[key]);
        });
        return object;
    }
    if (material.ext && material.ext.code) {
        material.ext.code = deep(material.ext.code);
    }

    function change(str: string) {
        if (!/{{(.*?)}}/.test(str)) {
            return str;
        }
        // @ts-ignore
        // with (generator) {
        //     return str.replace(/{{(.*?)}}/g, ($1, $2) => eval($2));
        // }
        const args = [];
        const fns = [];
        for (const prop in generator) {
            if (typeof generator[prop] === 'function') {
                fns.push(prop);
            } else {
                args.push(prop);
            }
        }
        let s: string;
        const code = `
            const { ${args} } = generator;
            let { ${fns} } = generator;
            ${fns.map(fn => `${fn} = ${fn}.bind(generator);`).join('\n')}
            s = str.replace(/{{(.*?)}}/g, ($1, $2) => eval($2));
        `;
        eval(code);
        return s;
    }
}
