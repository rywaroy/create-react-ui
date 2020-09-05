import { IMaterial } from '../../../types/making';
import GeneratorMaterial from './GeneratorMaterial';
import codeFormat from '../../../utils/codeFormat';

type IPlugin = ((material: IMaterial, generatorMaterial: GeneratorMaterial, generator?: Generator) => void)[]

interface IOption {
    plugin: IPlugin;
    url: string;
    name: string;
    namespace: string;
}

export default class Generator {
    materials: IMaterial[];

    plugin: IPlugin;

    jsx: string = '';

    url: string;

    name: string;

    namespace: string;

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
        return codeFormat(this.jsx);
    }

    getMaterials(materials: IMaterial[]) {
        materials.forEach(m => {
            const material = new GeneratorMaterial(m, this);
            material.create();
            if (m.children) {
                this.getMaterials(m.children);
                material.endTag();
            }
        });
    }
}
