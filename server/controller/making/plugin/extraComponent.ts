import { IMaterial, IComponentOption } from '../../../types/making';
import Generator from '../generator';
import GeneratorMaterial from '../generator/GeneratorMaterial';

/**
 * 处理额外导出的组件
 */
export default function extraComponent(material: IMaterial, generatorMaterial: GeneratorMaterial, generator: Generator) {
    if (material.ext && material.ext.componentPath) {
        setExtComponent(material, undefined, material.ext.componentPath);
    } else if (material.props.extraComponent) {
        const name = material.props.extraName || 'Component';

        const componentName = name.charAt(0).toUpperCase() + name.slice(1);
        if (!material.ext) {
            material.ext = {};
        }
        setExtComponent(material, componentName);
        material.ext.isExtraComponent = true;
        setDefaultValue(generator.files['index.js'] as IComponentOption, `./components/${componentName}`, componentName);
    }
    delete material.props.extraComponent;
    delete material.props.extraName;
}

function setExtComponent(material: IMaterial, componentName?: string, componentPath?: string) {
    if (!material.ext.code) {
        material.ext.code = {};
    }
    if (material.ext.extraCode) {
        Object.keys(material.ext.extraCode).forEach(file => {
            if (file.indexOf('index.js') > -1 && componentName) {
                (material.ext.extraCode[file] as IComponentOption).name = componentName;
                material.ext.componentPath = `components/${componentName}`;
                componentPath = `components/${componentName}`;
            }
            material.ext.code[`components/${componentName}/${file}`] = material.ext.extraCode[file];
        });
    }
    if (!componentName) { // 子组件
        Object.keys(material.ext.code).forEach(file => {
            if (file !== 'model.js') {
                material.ext.code[`${componentPath}/${file}`] = material.ext.code[file];
                delete material.ext.code[file];
            }
        });
    }
    if (material.children) {
        material.children.forEach(child => {
            if (!child.ext) {
                child.ext = {};
            }
            child.ext.componentPath = componentPath;
        });
    }
}

function setDefaultValue(file: IComponentOption, from: string, value: string) {
    if (!file.importDeclaration) {
        file.importDeclaration = {};
    }
    const { importDeclaration } = file;
    if (!importDeclaration[from]) {
        importDeclaration[from] = {};
    }
    importDeclaration[from].default = value;
}
