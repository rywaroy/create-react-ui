import GeneratorMaterial from '../generator/GeneratorMaterial';
import Generator from '../generator';
import { IMaterial, IComponentOption } from '../../../types/making';

/**
 * 收集页面数据
 */
export default function page(material: IMaterial, generatorMaterial: GeneratorMaterial, generator: Generator) {
    if (material.ext && material.ext.code) {
        Object.keys(material.ext.code).forEach(file => {
            if (file === 'model') { // model文件

            } else if (Array.isArray(material.ext.code)) { // 其他文件
                if (!generator.files[file]) {
                    generator.files[file] = [];
                }
                generator.files[file] = generator.files[file].concat(material.ext.code[file]);
            } else { // 组件文件
                if (!generator.files[file]) {
                    generator.files[file] = {};
                }
                mergeComponentFile(generator.files[file], (material.ext.code[file] as IComponentOption));
            }
        });
    }
}

function mergeComponentFile(source: IComponentOption, target: IComponentOption) {
    const arrayProps = ['variableDeclarator', 'methods', 'useState', 'useEffect'];

    Object.keys(target).forEach(key => {
        if (!source[key]) {
            source[key] = target[key];
        } else if (arrayProps.indexOf(key) > -1) {
            source[key] = source[key].cancat(target[key]);
        } else {
            Object.keys(target[key]).forEach(d => {
                if (!source[key][d]) {
                    source[key][d] = target[key][d];
                } else if (key === 'destructuring') {
                    source[key][d] = Array.from(new Set(source[key][d].concat(target[key][d])));
                } else if (key === 'import') {
                    if (target[key][d].default) {
                        source[key][d].default = target[key][d].default;
                    }
                    if (target[key][d].export) {
                        let ta: string[];
                        if (typeof target[key][d].export === 'string') {
                            ta = [(target[key][d].export as string)];
                        } else {
                            ta = (target[key][d].export as string[]);
                        }
                        let sa: string[];
                        if (source[key][d].export) {
                            if (typeof source[key][d].export === 'string') {
                                sa = [(source[key][d].export as string)];
                            } else {
                                sa = (source[key][d].export as string[]);
                            }
                        } else {
                            sa = [];
                        }
                        source[key][d].export = Array.from(new Set(sa.concat(ta)));
                    }
                }
            });
        }
    });
}
