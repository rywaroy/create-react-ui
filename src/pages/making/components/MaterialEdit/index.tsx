import React from 'react';
import editComponentsMap from '@/components/edit';
import { IMaterial } from '@/types/making';
import styles from './index.less';

interface IProps {
    material: IMaterial;
    editProps: (values: any) => void;
}

interface IState {

}

class MaterialEidt extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    onEidtChange = (values: any) => {
        this.props.editProps(values);
    }

    render() {
        const { material } = this.props;
        return (
            <div className={styles.editList}>
                <div className={styles.editTitle}>编辑属性</div>
                {
                    material && material.editComponents.map((item) => {
                        const EditComponent = editComponentsMap[item.name];
                        return EditComponent
                            ? <div className={styles.editItem}><EditComponent {...material.props} key={item.name} onChange={(values: any) => this.onEidtChange(values)} /></div> : null;
                    })
                }
            </div>
        );
    }
}

export default MaterialEidt;
