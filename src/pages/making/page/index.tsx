import React from 'react';
import { connect } from 'dva';
import { GlobalModelState } from '@/models/global';
import materials from '@/components/materials';
import { BaseContentMaterial } from '@/components/materials/BaseContent';
import { IMaterial } from '@/types/making';
import MaterialList from '../components/MaterialList';
import MaterialContent from '../components/MaterialContent';
import styles from './index.less';

interface IProps {
    global: GlobalModelState;
    dispatch: Function;
}

interface IState {
    materialList: IMaterial[];
    material: IMaterial | null;
    id: number,
    codeVisible: boolean;
    codeKey: number;
    code: string;
}

class Making extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            materialList: [BaseContentMaterial],
            material: null,
            id: 0,
            // codeVisible: false,
            // codeKey: Math.random(),
            // code: '',
        };
    }

    materialContent: MaterialContent;

    /**
     * 清空
     */
    clear = () => {
        this.setState({
            material: null,
            id: 0,
            materialList: [BaseContentMaterial],
        });
    }

    addMaterial = (material: IMaterial) => {
        this.materialContent.addMaterial(material);
    }

    componentDidMount() {
        // 收起菜单
        this.props.dispatch({
            type: 'global/updateState',
            payload: {
                collapsed: true,
            },
        });
    }

    render() {
        const { materialList } = this.state;
        return (
            <div className={styles.pageWrap}>
                <div className={styles.material}>
                    <MaterialList
                        materials={materials}
                        addMaterial={this.addMaterial} />
                </div>
                <div className={styles.pageContent}>
                    <MaterialContent
                        ref={el => { this.materialContent = el; }}
                        materialList={materialList}
                        setMaterialList={(materialList) => this.setState({ materialList })}
                        setMaterial={(material, id) => this.setState({ material, id })}
                        clear={this.clear} />
                </div>
                <div className={styles.edit} />
            </div>
        );
    }
}

export default connect(({ global }: { global: GlobalModelState }) => ({
    global,
}))(Making);
