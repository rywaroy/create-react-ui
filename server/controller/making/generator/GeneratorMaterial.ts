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
        const { props, tag } = this.material;
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
        // this.generator.jsx += this.jsx;
        let file = 'index.js';
        if (this.material.ext && this.material.ext.componentPath) {
            file = `${this.material.ext.componentPath}/index.js`;
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
            file = `${this.material.ext.componentPath}/index.js`;
        }
        this.generator.files[file].jsx += this.jsx;
        this.jsx = '';
    }

    toStringProps(props: any) {
        return Object.keys(props).map((key) => {
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
