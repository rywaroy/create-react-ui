import cloneDeep from 'lodash/cloneDeep';
import { IMaterial } from '../../../types/making';

/**
 * 默认执行的操作
 */
export default function defaultPlugin(material: IMaterial) {
    material.copyProps = cloneDeep(material.props);
}
