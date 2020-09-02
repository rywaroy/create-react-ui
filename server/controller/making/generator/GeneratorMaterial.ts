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
        const propsString = Object.keys(props).map((key) => `${key}={${JSON.stringify(props[key])}}`).join(' ');
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
        this.generator.jsx += this.jsx;
        this.jsx = '';
    }

    endTag() {
        this.emit('before-create-endTag');
        this.jsx += `</${this.material.tag}>`;
        this.emit('after-create-endTag');
        this.generator.jsx += this.jsx;
        this.jsx = '';
    }
}
