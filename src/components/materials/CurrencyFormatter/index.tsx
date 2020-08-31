import React from 'react';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';
import styles from './index.less';

/**
 * 金额格式转化
 */
export default function CurrencyFormatter(props) {
    const { className = '', precision = 2, ...other } = props;
    let txt = props.children;

    if (txt && !isNaN(txt)) {
        txt = formater(Number(txt), precision);
    }
    console.log(txt);

    return <i className={`${styles.defaultWrapper} ${className}`} {...other}>{txt}</i>;
}

function formater(val: number, precision: number) {
    const num = val.toFixed(precision);
    return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const CurrencyFormatterMaterial: IMaterial = {
    name: '数字格式化组件',
    tag: 'CurrencyFormatter',
    from: '@/componenets',
    id: Math.random(),
    component: materialWrap(CurrencyFormatter, 'inline-block'),
    intro: '数字格式化组件',
    props: {
        children: ['1000'],
    },
    haveChildren: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'prop', props: { propName: 'children', propType: 'string' } },
    ],
};
