import { IMaterial, IComponentOption } from '../../../types/making';

/**
 * 处理根组件
 */
export default function baseComponent(material: IMaterial) {
    if (material.id === 1) { // 根组件
        // if (material.props.project === '油涟后台') {
        //     const index = (material.ext.code['index.js'] as IComponentOption);
        //     index.importDeclaration.react.export = ['useEffect'];
        //     index.importDeclaration.dva = {
        //         export: ['useDispatch', 'useSelector'],
        //     };
        //     index.variableDeclarator = [
        //         'const dispatch = useDispatch();',
        //         'const {{namespace}} = useSelector(state => state.{{namespace}});',
        //     ];
        //     index.useEffect = [
        //         `useEffect(() => {
        //             return () => {
        //                 dispatch({ type: '{{namespace}}/resetState' });
        //             };
        //         }, []);`,
        //     ];
        // }

        delete material.props.project;
    }
}
