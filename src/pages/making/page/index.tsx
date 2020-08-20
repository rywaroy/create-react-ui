import React from 'react';
import { connect } from 'dva';
import { Tabs, message } from 'antd';
import { GlobalModelState } from '@/models/global';
import materials from '@/components/materials';
import { BaseContentMaterial } from '@/components/materials/BaseContent';
import { IMaterial, IPageItem } from '@/types/making';
import { getPageList, addPageList } from '@/services/making';
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
    pageList: IPageItem[];
}

const { TabPane } = Tabs;

class Making extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            materialList: [BaseContentMaterial],
            material: null,
            id: 0,
            pageList: [],
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

    /**
     * 记录拖拽的material
     */
    setAddMaterial = (material: IMaterial) => {
        this.materialContent.addMaterial(material, undefined, undefined, true);
    }

    /**
     * 获取pageList
     */
    getPageList() {
        getPageList()
            .then(res => {
                this.setState({
                    pageList: res.data.data,
                });
            });
    }

    /**
     * 保存pageList
     */
    save = (name: string, id?: number) => {
        if (id) {
            const materials = [...this.state.materialList];
            const ids: number[] = [id];
            const findMaterial = (pid: number) => {
                materials.forEach((material) => {
                    if (material.pid === pid) {
                        ids.push(material.id);
                        findMaterial(material.id);
                    }
                });
            };
            findMaterial(id);
            addPageList({
                title: name,
                value: materials.filter((item) => ids.indexOf(item.id) > -1),
                isPage: false,
            }).then(() => {
                message.success('保存成功');
            });
        } else { // 保存整个页面
            addPageList({
                title: name,
                value: this.state.materialList,
                isPage: true,
            }).then(() => {
                message.success('保存成功');
            });
        }
    }

    componentDidMount() {
        // 收起菜单
        this.props.dispatch({
            type: 'global/updateState',
            payload: {
                collapsed: true,
            },
        });
        this.getPageList();
    }

    render() {
        const { materialList, material, id } = this.state;
        return (
            <div className={styles.pageWrap}>
                <div className={styles.material}>
                    <MaterialList
                        materials={materials}
                        addMaterial={this.addMaterial}
                        setAddMaterial={this.setAddMaterial} />
                </div>
                <div className={styles.pageContent}>
                    <MaterialContent
                        ref={el => { this.materialContent = el; }}
                        materialList={materialList}
                        setMaterialList={(materialList) => this.setState({ materialList })}
                        setMaterial={(material, id) => this.setState({ material, id })}
                        clear={this.clear}
                        save={this.save} />
                </div>
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
