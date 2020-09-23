import { IMaterial } from '../../../types/making';
import Generator from '../generator';

export default function createJsx(material: IMaterial, generator: Generator) {
    this.emit('before-create-jsx');
    const { props, tag, extraProps = {} } = material;
    this.emit('before-create-props');
    const propsString = toStringProps(props);
    this.emit('after-create-props');
    this.emit('before-create-startTag');
    this.jsx += `<${tag} ${propsString}>`;
    this.emit('after-create-startTag');
    if (!material.children) {
        this.emit('before-create-endTag');
        this.jsx += `</${tag}>`;
        this.emit('after-create-endTag');
    }
    this.emit('after-create-jsx');
    let file = 'index.js';
    if (material.ext && material.ext.componentPath) {
        Object.keys(generator.files).forEach(f => {
            // 找到index.js 结尾的作为组件主页面
            if (f.endsWith('index.js')) {
                file = f;
            }
        });
        if (material.ext.isExtraComponent) {
            // 主页面组件jsx
            const { extraName } = material.copyProps;
            generator.files['index.js'].jsx += `<${extraName.charAt(0).toUpperCase() + extraName.slice(1)} ${toStringProps(extraProps)} />`;
        }
    }
    if (!generator.files[file].jsx) {
        generator.files[file].jsx = '';
    }
    generator.files[file].jsx += this.jsx;
    this.jsx = '';
}

function toStringProps(props: any) {
    return Object.keys(props).map((key) => {
        if (!props[key]) {
            return '';
        }
        if (key === 'expansion') {
            if (typeof props[key] === 'string') {
                return props[key];
            }
            return props[key].join(' ');
        }
        if (key.endsWith('FS')) {
            const newProps = key.slice(0, -2);
            return `${newProps}={${props[key]}}`;
        }
        return `${key}={${JSON.stringify(props[key])}}`;
    }).join(' ');
}
