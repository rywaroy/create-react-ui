import { IMaterial } from '../../../types/making';
import GeneratorMaterial from './GeneratorMaterial';
import codeFormat from '../../../utils/codeFormat';
import functionComponentIndex from '../../../templateString/function-component-index';

type IPlugin = ((material: IMaterial, generatorMaterial: GeneratorMaterial, generator?: Generator) => void)[]

interface IOption {
    plugin: IPlugin;
    url: string;
    name: string;
    namespace: string;
}

export default class Generator {
    private materials: IMaterial[];

    plugin: IPlugin;

    jsx: string = '';

    url: string;

    name: string;

    namespace: string;

    files: any = {};

    constructor(materials: IMaterial[], option: IOption) {
        const { plugin, url, name, namespace } = option;
        this.materials = materials;
        this.plugin = plugin;
        this.url = url;
        this.name = name;
        this.namespace = namespace;
    }

    create() {
        this.getMaterials(this.materials);
        return this.making();
    }

    private getMaterials(materials: IMaterial[]) {
        materials.forEach(m => {
            const material = new GeneratorMaterial(m, this);
            material.create();
            if (m.children) {
                this.getMaterials(m.children);
                material.endTag();
            }
        });
    }

    hasMaterialByTag(tag: string) {
        let haveTag = false;
        function ergodic(materials: IMaterial[]) {
            materials.forEach(m => {
                if (m.tag === tag) {
                    haveTag = true;
                }
                if (m.children) {
                    ergodic(m.children);
                }
            });
        }
        ergodic(this.materials);
        return haveTag;
    }

    making() {
        const files = {};
        Object.keys(this.files).forEach(file => {
            if (Array.isArray(this.files[file])) {
                files[file] = codeFormat(this.files[file].join('\n'));
            } else if (file === 'model') {

            } else {
                files[file] = codeFormat(functionComponentIndex(this.files[file], this.name, this.jsx));
            }
        });
        return files;
    }
}
