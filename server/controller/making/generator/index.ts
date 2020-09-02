import { IMaterial } from '../../../types/making';
import GeneratorMaterial from './GeneratorMaterial';
import codeFormat from '../../../utils/codeFormat';

type IPlugin = ((material: IMaterial, generatorMaterial: GeneratorMaterial, generator?: Generator) => void)[]

interface IOption {
    plugin: IPlugin;
}

export default class Generator {
    materials: IMaterial[];

    plugin: IPlugin;

    jsx: string = '';

    constructor(materials: IMaterial[], option: IOption) {
        const { plugin } = option;
        this.materials = materials;
        this.plugin = plugin;
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
