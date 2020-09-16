import React from 'react';
import editComponentsMap from '@/components/edit';
import { IMaterial } from '@/types/making';
import styles from './index.less';

interface IProps {
    material: IMaterial;
    modalList: IMaterial[];
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
        const { material, modalList } = this.props;
        return (
            <div className={styles.editList}>
                {
                    material && material.editComponents.map((item, index) => {
                        const EditComponent = editComponentsMap[item.name];
                        return EditComponent
                            ? <div className={styles.editItem} key={index}><EditComponent {...material.props} {...item.props} modalList={modalList} mid={material.id} onChange={(values: any) => this.onEidtChange(values)} /></div> : null;
                    })
                }
            </div>
        );
    }
}

export default MaterialEidt;
