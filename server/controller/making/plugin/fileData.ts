import GeneratorMaterial from '../generator/GeneratorMaterial';
import Generator from '../generator';
import { IMaterial, IComponentOption, IModelOption } from '../../../types/making';

/**
 * 收集页面数据
 */
export default function fileData(material: IMaterial, generatorMaterial: GeneratorMaterial, generator: Generator) {
    if (material.ext && material.ext.code) {
        Object.keys(material.ext.code).forEach(file => {
            if (file === 'model.js') { // model文件
                if (!generator.files[file]) {
                    generator.files[file] = {};
                }
                mergeModelFile(generator.files[file], (material.ext.code[file] as IModelOption));
            } else if (Array.isArray(material.ext.code[file])) { // 其他文件
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
            source[key] = source[key].concat(target[key]);
        } else {
            Object.keys(target[key]).forEach(d => {
                if (!source[key][d]) {
                    source[key][d] = target[key][d];
                } else if (key === 'destructuring') {
                    source[key][d] = Array.from(new Set(source[key][d].concat(target[key][d])));
                } else if (key === 'importDeclaration') {
                    if (target[key][d].default) {
                        source[key][d].default = target[key][d].default;
                    }
                    if (target[key][d].export) {
                        const ta = target[key][d].export;
                        const sa = source[key][d].export ? source[key][d].export : [];
                        source[key][d].export = Array.from(new Set(sa.concat(ta)));
                    }
                }
            });
        }
    });
}

function mergeModelFile(source: IModelOption, target: IModelOption) {
    const arrayProps = ['effects', 'reducers'];

    Object.keys(target).forEach(key => {
        if (!source[key]) {
            source[key] = target[key];
        } else if (arrayProps.indexOf(key) > -1) {
            source[key] = source[key].cancat(target[key]);
        } else if (key === 'importDeclaration') {
            Object.keys(target[key]).forEach(d => {
                if (target[key][d].default) {
                    source[key][d].default = target[key][d].default;
                }
                if (target[key][d].export) {
                    const ta = target[key][d].export;
                    const sa = source[key][d].export ? source[key][d].export : [];
                    source[key][d].export = Array.from(new Set(sa.concat(ta)));
                }
            });
        } else {
            Object.assign(source[key], target[key]);
        }
    });
}
