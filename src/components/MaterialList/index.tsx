import React, { Component } from 'react';
import { IMaterial } from '@/types/making';
import styles from './index.less';

interface IProps {
    materials: IMaterial[];
}

class MaterialList extends Component<IProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        const { materials } = this.props;
        return (
            <div className={styles.materialList}>
                {
                    materials.map(item => (
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
