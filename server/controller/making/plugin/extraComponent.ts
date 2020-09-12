import { IMaterial, IComponentOption } from '../../../types/making';

/**
 * 处理额外导出的组件
 */
export default function extraComponent(material: IMaterial) {
    if (material.ext && material.ext.componentPath) {
        setExtComponent(material, material.ext.componentPath);
    } else if (material.props.extraComponent) {
        const componentName = `${material.props.extraName || ''}${material.tag}`;
        if (!material.ext) {
            material.ext = {};
        }
        const componentPath = `components/${componentName.charAt(0).toUpperCase() + componentName.slice(1)}`;
        material.ext.componentPath = componentPath;
        setExtComponent(material, componentPath, componentName);
        if (!(material.ext.code[`${componentPath}/index.js`] as IComponentOption).importDeclaration) {
            (material.ext.code[`${componentPath}/index.js`] as IComponentOption).importDeclaration = {};
        }
        const { importDeclaration } = material.ext.code[`${componentPath}/index.js`] as IComponentOption;
        if (!importDeclaration.react) {
            importDeclaration.react = {};
        }
        importDeclaration.react.default = 'React';
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
