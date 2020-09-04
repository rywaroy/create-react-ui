import { IMaterial } from '../../../types/making';

export default function table(material: IMaterial) {
    if (material.tag === 'Table') {
        delete material.props.dataSource;
        delete material.props.columns;
        material.props.columnsFS = 'columns()';
    }
}
