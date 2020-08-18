import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import { GlobalModelState } from '@/models/global';
import materials from '@/components/materials';
import { BaseContentMaterial } from '@/components/materials/BaseContent';
import { IMaterial } from '@/types/making';
import MaterialList from '../components/MaterialList';
import MaterialContent from '../components/MaterialContent';
import MaterialEidt from '../components/MaterialEdit';
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

const { TabPane } = Tabs;

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

    /**
     * 编辑props
     */
    editProps = (values: any) => {
        const { id, materialList } = this.state;
        const materials = [...materialList];
        const material = materials.find((item) => item.id === id);
        material.props = { ...material.props, ...values };
        this.setState({
            materialList: materials,
            material,
        });
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
        const { materialList, material, id } = this.state;
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
                {/* <div className={styles.edit}>
                    <MaterialEidt
                        material={material}
                        key={id}
                        editProps={this.editProps} />
                </div> */}
                <div className={styles.edit}>
                    <Tabs defaultActiveKey="1" animated={false}>
                        <TabPane tab="组件属性" key="1">
                            <MaterialEidt
                                material={material}
                                key={id}
                                editProps={this.editProps} />
                        </TabPane>
                        <TabPane tab="页面属性" key="2">
                            页面属性
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default connect(({ global }: { global: GlobalModelState }) => ({
    global,
}))(Making);
