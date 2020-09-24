import React from 'react';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';
import img from './images/img.jpg';

const ImgTag: React.FC<any> = (props) => (
    <img src={img} alt="" {...props} />
);

export const ImgMaterial: IMaterial = {
    name: 'img',
    tag: 'img',
    from: '',
    id: Math.random(),
    component: materialWrap(ImgTag, 'inline-block'),
    intro: 'img标签',
    props: {
        style: {
            width: '100px',
            height: '100px',
        },
    },
    haveChildren: false,
    // haveWrap: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
    ],
};

export default ImgTag;
