import React from 'react';
import { IMaterial } from '@/types/making';
import styles from './index.less';

const BaseContent: React.FC<any> = (props) => (
    <main {...props} />
);

export const BaseContentMaterial: IMaterial = {
    name: '根组件',
    tag: 'main',
    from: '@/components',
    id: 1,
    component: BaseContent,
    intro: '根目录',
    props: {
        project: '油涟后台',
    },
    defaultProps: {
        className: styles.baseContent,
    },
    haveChildren: true,
    haveWrap: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'project' },
    ],
    ext: {
        code: {
            'index.js': {
                importDeclaration: {
                    react: {
                        default: 'React',
                        export: ['useEffect'],
                    },
                    dva: {
                        export: ['useDispatch', 'useSelector'],
                    },
                },
                variableDeclarator: [
                    'const dispatch = useDispatch();',
                    'const {{namespace}} = useSelector(state => state.{{namespace}});',
                ],
                useEffect: [
                    `useEffect(() => {
                        return () => {
                            dispatch({ type: '{{namespace}}/resetState' });
                        };
                    }, []);`,
                ],
            },
        },
    },
};

export default BaseContent;
