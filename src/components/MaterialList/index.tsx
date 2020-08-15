import React, { Component } from 'react';
import material from '@/components/material';
import styles from './index.less';

class MaterialList extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={styles.materialList}>
                {
                    material.map(item => (
                        <div className={styles.materialItem} draggable>
                            {item.name}
                            <span>&lt;{item.tag} /&gt;</span>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default MaterialList;
