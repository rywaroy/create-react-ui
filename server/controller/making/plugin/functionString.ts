import { IMaterial } from '../../../types/making';

export default function functionString(material: IMaterial) {
    Object.keys(material.props).forEach(prop => {
        if (prop.endsWith('FS')) {
            const newProps = prop.slice(0, -2);
            material.props[newProps] = material.props[prop];
            delete material.props[prop];
        }
    });
}
