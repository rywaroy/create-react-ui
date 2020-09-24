import Generator from '../generator';
import { IMaterial } from '../../../types/making';

export default function template(material: IMaterial, generator: Generator) {
    Object.keys(material.props).forEach(key => {
        material.props[key] = deep(material.props[key]);
    });
    if (material.extraProps) {
        Object.keys(material.extraProps).forEach(key => {
            material.extraProps[key] = deep(material.extraProps[key]);
        });
    }
    function deep(object) {
        if (typeof object === 'string') {
            return change(object);
        } if (Array.isArray(object)) {
            return object.map(item => deep(item));
        }
        Object.keys(object).forEach(key => {
            if (/{{.*?}}/.test(key)) {
                object[change(key)] = deep(object[key]);
                delete object[key];
            } else {
                object[key] = deep(object[key]);
            }
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
        const props = Object.keys(material.props);
        const copyProps = Object.keys(material.copyProps);
        // 找到被删除的props
        const deleteProps = copyProps.filter(item => props.indexOf(item) === -1);
        let s: string;
        const code = `
            const { ${args} } = generator;
            let { ${fns} } = generator;
            const { ${props} } = material.props;
            const { ${deleteProps} } = material.copyProps;
            ${fns.map(fn => `${fn} = ${fn}.bind(generator);`).join('\n')}
            s = str.replace(/{{(.*?)}}/g, ($1, $2) => eval($2));
        `;
        eval(code);
        return s;
    }
}
