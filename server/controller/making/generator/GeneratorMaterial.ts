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
            fn.call(this, this.material, this.generator);
        });
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
}
