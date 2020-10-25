import { IMaterial, IComponentOption } from '../../../types/making';

/**
 * 处理根组件
 */
export default function baseComponent(material: IMaterial) {
    if (material.tag === 'main') {
        if (material.props.project !== '油涟后台') {
            (material.ext.code['index.js'] as IComponentOption).useEffect.shift();
        }
        delete material.props.project;
    }
}
