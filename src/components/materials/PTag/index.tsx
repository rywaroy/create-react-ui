import React from 'react';
import { IMaterial } from '@/types/making';

const PTag: React.FC<any> = (props) => (
    <p {...props} />
);

export const PMaterial: IMaterial = {
    name: 'p',
    tag: 'p',
    from: '',
    id: Math.random(),
    component: PTag,
    intro: 'p标签',
    props: {
        children: ['测试段落测试段落'],
    },
    haveChildren: false,
    haveWrap: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'prop', props: { propName: 'children', propType: 'string' } },
    ],
};

export default PTag;
