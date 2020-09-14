import { IMaterial, IComponentOption } from '../../../types/making';
import Generator from '../generator';
import GeneratorMaterial from '../generator/GeneratorMaterial';

/**
 * 处理额外导出的组件
 */
export default function extraComponent(material: IMaterial, generatorMaterial: GeneratorMaterial, generator: Generator) {
    if (material.ext && material.ext.componentPath) {
        setExtComponent(material, material.ext.componentPath);
    } else if (material.props.extraComponent) {
        const name = `${material.props.extraName || ''}${material.tag}`;
        const componentName = name.charAt(0).toUpperCase() + name.slice(1);
        if (!material.ext) {
            material.ext = {};
        }
        const componentPath = `components/${componentName}`;
        material.ext.componentPath = componentPath;
        setExtComponent(material, componentPath, componentName);
        setDefaultValue((material.ext.code[`${componentPath}/index.js`] as IComponentOption), 'react', 'React');
        material.ext.isExtraComponent = true;
        setDefaultValue(generator.files['index.js'] as IComponentOption, `./components/${componentName}`, componentName);
        delete material.props.extraComponent;
        delete material.props.extraName;
    }
}

function setExtComponent(material: IMaterial, componentPath: string, componentName?: string) {
    if (material.ext.code) {
        Object.keys(material.ext.code).forEach(file => {
            material.ext.code[`${componentPath}/${file}`] = material.ext.code[file];
            if (file === 'index.js' && componentName) {
                (material.ext.code[`${componentPath}/${file}`] as IComponentOption).name = componentName;
            }
            delete material.ext.code[file];
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
