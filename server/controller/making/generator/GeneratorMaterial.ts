import { EventEmitter } from 'events';
import { IMaterial } from '../../../types/making';
import Generator from './index';

export default class GeneratorMaterial extends EventEmitter {
    material: IMaterial;

    generator: Generator;

    jsx: string = '';

    constructor(material: IMaterial, generator: Generator) {
        super();
        this.material = material;
        this.generator = generator;
    }

    create() {
        this.generator.plugin.forEach(fn => {
            fn(this.material, this, this.generator);
        });
        this.emit('before-create-jsx');
        const { props, tag, extraProps = {} } = this.material;
        this.emit('before-create-props');
        const propsString = this.toStringProps(props);
        this.emit('after-create-props');
        this.emit('before-create-startTag');
        this.jsx += `<${tag} ${propsString}>`;
        this.emit('after-create-startTag');
        if (!this.material.children) {
            this.emit('before-create-endTag');
            this.jsx += `</${tag}>`;
            this.emit('after-create-endTag');
        }
        this.emit('after-create-jsx');
        let file = 'index.js';
        if (this.material.ext && this.material.ext.componentPath) {
            Object.keys(this.generator.files).forEach(f => {
                // 找到index.js 结尾的作为组件主页面
                if (f.endsWith('index.js')) {
                    file = f;
                }
            });
            if (this.material.ext.isExtraComponent) {
                // 主页面组件jsx
                const { extraName } = this.material.copyProps;
                this.generator.files['index.js'].jsx += `<${extraName.charAt(0).toUpperCase() + extraName.slice(1)} ${this.toStringProps(extraProps)} />`;
            }
        }
        if (!this.generator.files[file].jsx) {
            this.generator.files[file].jsx = '';
        }
        this.generator.files[file].jsx += this.jsx;
        this.jsx = '';
    }

    endTag() {
        this.emit('before-create-endTag');
        this.jsx += `</${this.material.tag}>`;
        this.emit('after-create-endTag');
        let file = 'index.js';
        if (this.material.ext && this.material.ext.componentPath) {
            Object.keys(this.generator.files).forEach(f => {
                // 找到index.js 结尾的作为组件主页面
                if (f.endsWith('index.js')) {
                    file = f;
                }
            });
        }
        this.generator.files[file].jsx += this.jsx;
        this.jsx = '';
    }

    toStringProps(props: any) {
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
}
