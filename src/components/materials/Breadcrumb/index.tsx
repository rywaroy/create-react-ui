import React from 'react';
import { IMaterial } from '@/types/making';
import { Breadcrumb } from 'antd';
import materialWrap from '../MaterialWrap';
import styles from './index.less';

interface IProps {
  list: string[];
}

const BreadCrumb: React.FC<IProps> = (props) => (
    <div className={styles.Breadcrumb}>
        <Breadcrumb>
            {
                props.list.map(item => (
                    <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
                ))
            }
        </Breadcrumb>
    </div>
);

export const BreadCrumbMaterial: IMaterial = {
    name: '面包屑',
    tag: 'BreadCrumb',
    from: '@/components/Breadcrumb',
    id: Math.random(),
    component: materialWrap(BreadCrumb),
    intro: '面包屑组件',
    props: {
        list: ['首页'],
    },
    haveChildren: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'array', props: { propName: 'list' } },
    ],
    project: '陆运通后台',
    ext: {
        code: {
            'index.js': {
                importDeclaration: {
                    '@/components/Breadcrumb': {
                        default: 'BreadCrumb',
                    },
                },
            },
        },
    },
};

export default BreadCrumb;
