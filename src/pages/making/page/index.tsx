import React from 'react';
import { connect } from 'dva';
import { Tabs, message, Modal, Select, Button } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import { GlobalModelState } from '@/models/global';
import materials from '@/components/materials';
import { BaseContentMaterial } from '@/components/materials/BaseContent';
import { IMaterial, IPageItem } from '@/types/making';
import { getPageList, addPageList } from '@/services/making';
import MaterialList from '../components/MaterialList';
import MaterialContent from '../components/MaterialContent';
import MaterialEidt from '../components/MaterialEdit';
import { loadMaterial } from './map';
import styles from './index.less';

interface IProps {
    global: GlobalModelState;
    dispatch: Function;
}

interface IState {
    materialList: IMaterial[];
    material: IMaterial | null;
    id: number;
    modalList: IMaterial[];
    codeVisible: boolean;
    codeKey: number;
    code: string;
    pageList: IPageItem[];
    loadVisible: boolean;
    loadPageIndex: number;
}

const { TabPane } = Tabs;

class Making extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            materialList: [BaseContentMaterial],
            material: null,
            id: 0,
            modalList: [],
            pageList: [],
            loadVisible: false,
            loadPageIndex: 0,
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
    save = (name: string, id: number = 1) => {
        const materials = cloneDeep(this.state.materialList);
        const ids: number[] = id === 1 ? [] : [id];
        const findMaterial = (pid: number) => {
            materials.forEach((material) => {
                if (material.component) {
                    delete material.component;
                }
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
        }).then(() => {
            message.success('保存成功');
            this.getPageList();
        });
    }

    /**
     * 打开保存列表
     */
    openLoad = () => {
        this.setState({
            loadVisible: true,
        });
    }

    /**
     * 关闭保存列表
     */
    closeLoad = () => {
        this.setState({
            loadVisible: false,
        });
    }

    /**
     * 载入
     */
    loadPage = () => {
        const { loadPageIndex, pageList } = this.state;
        const page = pageList[loadPageIndex];
        const { value } = page;
        const materialList = [...this.state.materialList];
        const ms = cloneDeep(value);
        const componentMap = {};
        materials.forEach(m => {
            componentMap[m.tag] = m.component;
        });
        function findChildMaterial(pid?: number, npid?: number) {
            ms.forEach((material) => {
                if (!material.component) {
                    const oldId = material.id;
                    const newId = Math.random();
                    if (material.pid === pid) {
                        material.id = newId;
                        material.pid = npid;
                        material.active = false;
                        material.component = componentMap[material.tag];
                        findChildMaterial(oldId, newId);
                    } else if (!pid) {
                        material.id = newId;
                        material.active = false;
                        material.component = componentMap[material.tag];
                        findChildMaterial(oldId, newId);
                    }
                }
            });
        }
        findChildMaterial();
        ms.forEach((material) => {
            loadMaterial(material);
            if (!material.component) {
                material.pid = 1;
                material.active = false;
                material.component = componentMap[material.tag];
            }
        });
        this.setState({
            materialList: materialList.concat(ms),
        });
        this.closeLoad();
    }

    setMaterialList = (materialList: IMaterial[]) => {
        // 筛选出弹窗组件
        const modalList: IMaterial[] = [];
        materialList.forEach(material => {
            if (material.ext?.type === 'modal') {
                modalList.push(material);
            }
        });
        this.setState({
            materialList,
            modalList,
        });
    }

    setMaterial = (material: IMaterial, id: number) => {
        this.setState({ material, id });
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
        const { materialList, material, id, loadVisible, pageList, loadPageIndex, modalList } = this.state;
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
                        setMaterialList={this.setMaterialList}
                        setMaterial={this.setMaterial}
                        clear={this.clear}
                        save={this.save}
                        openLoad={this.openLoad} />
                    <div>
                        {
                            modalList.map(modal => (
                                <Button style={{ marginRight: '10px' }} onClick={() => this.setMaterial(modal, modal.id)}>{modal.props.title}</Button>
                            ))
                        }
                    </div>
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
                <Modal
                    title="保存列表"
                    width="400px"
                    visible={loadVisible}
                    onCancel={this.closeLoad}
                    onOk={this.loadPage}>
                    <Select
                        style={{ width: '100%' }}
                        value={loadPageIndex}
                        onChange={(value: number) => this.setState({ loadPageIndex: value })}>
                        {
                            pageList.map((item, index) => (
                                <Select.Option value={index} key={item.id}>{item.title}</Select.Option>
                            ))
                        }
                    </Select>
                </Modal>
            </div>
        );
    }
}

export default connect(({ global }: { global: GlobalModelState }) => ({
    global,
}))(Making);
