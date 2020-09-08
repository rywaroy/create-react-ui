import React from 'react';
import { connect } from 'dva';
import { Tabs, message, Modal, Select, Button, Input } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import { GlobalModelState } from '@/models/global';
import materials from '@/components/materials';
import { BaseContentMaterial } from '@/components/materials/BaseContent';
import { IMaterial, IPageItem, IPageProps } from '@/types/making';
import { getPageList, addPageList, preview } from '@/services/making';
import MaterialList from './components/MaterialList';
import MaterialContent from './components/MaterialContent';
import MaterialEidt from './components/MaterialEdit';
import PageProps from './components/PageProps';
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
    code: { [file: string]: any};
    pageList: IPageItem[];
    loadVisible: boolean;
    loadPageIndex: number;
    saveName: string;
    saveId: number | null;
    saveVisible: boolean;
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
            saveName: '',
            saveId: null,
            saveVisible: false,
            codeVisible: false,
            codeKey: Math.random(),
            code: {},
        };
    }

    materialContent: MaterialContent;

    pageProps: any;

    /**
     * 清空
     */
    clear = () => {
        this.setState({
            material: null,
            id: 0,
            materialList: [BaseContentMaterial],
            modalList: [],
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

    /**
     * 设置组件列表
     */
    setMaterialList = (materialList: IMaterial[]) => {
        // 筛选出弹窗组件
        const modalList: IMaterial[] = [];
        materialList.forEach(item => {
            if (item.ext?.type === 'modal') {
                modalList.push(item);
            }
        });
        this.setState({
            materialList,
            modalList,
        });
    }

    /**
     * 设置目标组件以及组件列表
     */
    setMaterial = (material: IMaterial, materials?: IMaterial[]) => {
        let materialList = [...this.state.materialList];
        // 筛选出弹窗组件
        const modalList: IMaterial[] = [];
        if (materials) {
            materialList = materials;
        }
        const id = material ? material.id : 0;
        materialList.forEach((item) => {
            if (item.id === id) {
                item.active = true;
            } else {
                item.active = false;
            }
            if (item.ext?.type === 'modal') {
                modalList.push(item);
            }
        });
        this.setState({
            material,
            id,
            materialList,
            modalList,
        });
    }

    /**
     * 打开保存弹窗
     */
    openSave = (id?: number) => {
        if (this.state.materialList.length < 2) {
            message.error('请添加组件');
            return;
        }
        this.setState({
            saveId: id,
            saveVisible: true,
        });
    }

    /**
     * 关闭保存弹窗
     */
    closeSave = () => {
        this.setState({
            saveId: null,
            saveVisible: false,
            saveName: '',
        });
    }

    /**
     * 确认保存
     */
    confirmSave = () => {
        const { saveId, saveName } = this.state;
        if (!saveName) {
            message.error('请输入保存名字');
            return;
        }
        this.save(saveName, saveId);
        this.closeSave();
    }

    /**
     * 预览
     */
    preview = () => {
        const { materialList } = this.state;
        if (materialList.length < 2) {
            message.error('请添加组件');
            return;
        }
        if (!this.pageProps) {
            message.error('请设置页面属性');
            return;
        }
        this.pageProps.props.form.validateFields((err, values: IPageProps) => {
            preview({
                ...values,
                materials: this.getMaterilTree(materialList),
            }).then(res => {
                this.setState({
                    codeKey: Math.random(),
                    codeVisible: true,
                    code: res.data.data,
                });
            });
        });
    }

    /**
     * 关闭代码弹窗
     */
    closeCode = () => {
        this.setState({
            codeVisible: false,
        });
    }

    /**
     * 生成
     */
    create = () => {
        this.pageProps.props.form.validateFields((err, values: IPageProps) => {
            console.log(values);
        });
    }

    getMaterilTree(list: IMaterial[]) {
        const result: IMaterial[] = [];
        const data = cloneDeep(list);
        const hash: {
          [props: number]: IMaterial
        } = {};
        data.forEach((_, index) => {
            hash[data[index].id] = data[index];
        });
        data.forEach((item) => {
            const hashVP = hash[(item.pid as number)];
            if (hashVP) {
                if (hashVP.children) {
                    hashVP.children.push(item);
                } else {
                    hashVP.children = [item];
                }
            } else {
                result.push(item);
            }
        });
        return result;
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
        const { materialList, material, id, loadVisible, pageList, loadPageIndex, modalList, saveVisible, saveName, codeVisible, codeKey, code } = this.state;
        const { folders } = this.props.global;

        const files = [];
        Object.keys(code).forEach(file => {
            files.push({
                file,
                code: code[file],
            });
        });

        return (
            <div className={styles.pageWrap}>
                <div className={styles.material}>
                    <MaterialList
                        materials={materials}
                        addMaterial={this.addMaterial}
                        setAddMaterial={this.setAddMaterial} />
                </div>
                <div className={`${styles.pageContent} light-theme`}>
                    <div className={styles.opt}>
                        <Button type="primary" style={{ marginRight: '10px' }} onClick={this.create}>生成</Button>
                        <Button type="primary" style={{ marginRight: '10px' }} onClick={this.preview}>预览</Button>
                        <Button type="primary" onClick={() => this.openSave()} style={{ marginRight: '10px' }}>保存</Button>
                        <Button type="primary" onClick={this.openLoad} style={{ marginRight: '10px' }}>载入</Button>
                        <Button type="danger" onClick={this.clear} style={{ marginRight: '10px' }}>清空</Button>
                    </div>
                    <MaterialContent
                        ref={el => { this.materialContent = el; }}
                        materialList={materialList}
                        setMaterialList={this.setMaterialList}
                        setMaterial={this.setMaterial}
                        save={this.openSave} />
                    <div className={styles.modalBtns}>
                        {
                            modalList.map(modal => (
                                <Button key={modal.id} style={{ marginRight: '10px' }} onClick={() => this.setMaterial(modal)}>{modal.props.title}</Button>
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
                            <div className={styles.pageProps}>
                                <PageProps folders={folders} wrappedComponentRef={el => { this.pageProps = el; }} />
                            </div>
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
                <Modal
                    title="保存"
                    width="400px"
                    visible={saveVisible}
                    onCancel={this.closeSave}
                    onOk={this.confirmSave}>
                    <Input placeholder="命名" value={saveName} onChange={(e) => this.setState({ saveName: e.target.value })} />
                </Modal>
                <Modal
                    title="代码"
                    visible={codeVisible}
                    key={codeKey}
                    width="700px"
                    onCancel={this.closeCode}
                    onOk={this.closeCode}>
                    <div>

                        <Tabs animated={false}>
                            {
                                files.map(file => (
                                    <TabPane tab={file.file} key={file.file}>
                                        <pre>{file.code}</pre>
                                    </TabPane>
                                ))
                            }
                        </Tabs>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default connect(({ global }: { global: GlobalModelState }) => ({
    global,
}))(Making);
