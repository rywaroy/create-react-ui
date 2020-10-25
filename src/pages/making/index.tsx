import React from 'react';
import { connect } from 'dva';
import { Tabs, message, Modal, Select, Button, Input, Spin, Switch } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import { GlobalModelState } from '@/models/global';
import materials from '@/components/materials';
import { BaseContentMaterial } from '@/components/materials/BaseContent';
import { IMaterial, IPageItem, IPageProps } from '@/types/making';
import { getPageList, addPageList, preview, create } from '@/services/making';
import MaterialList from './components/MaterialList';
import MaterialContent from './components/MaterialContent';
import MaterialEidt from './components/MaterialEdit';
import PageProps from './components/PageProps';
import FastBuild from './components/FastBuild';
import { loadMaterial, YLComponentsList, LYTComponentsList } from './map';
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
    code: { [file: string]: any };
    pageList: IPageItem[];
    loadVisible: boolean;
    loadPageIndex: number;
    saveName: string;
    saveId: number | null;
    saveVisible: boolean;
    codeLoading: boolean;
    showCode: boolean;
    codeTip: string;
    fastVisible: boolean;
    fastKey: number;
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
            code: {},
            codeLoading: false,
            showCode: false,
            codeTip: '',
            fastVisible: false,
            fastKey: Math.random(),
        };
        this.getCode = debounce(this.getCode, 1000);
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
        this.getCode();
    }

    addMaterial = (material: IMaterial) => {
        this.materialContent.addMaterial(material);
        this.getCode();
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
        this.getCode();
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
            const mid = `${m.project || m.name}_${m.tag}`;
            componentMap[mid] = m.component;
        });
        function findChildMaterial(pid?: number, npid?: number) {
            ms.forEach((material) => {
                if (!material.component) {
                    const oldId = material.id;
                    const newId = Math.random();
                    const mid = `${material.project || material.name}_${material.tag}`;
                    if (material.pid === pid) {
                        material.id = newId;
                        material.pid = npid;
                        material.active = false;
                        material.component = componentMap[mid];
                        findChildMaterial(oldId, newId);
                    } else if (!pid) {
                        material.id = newId;
                        material.active = false;
                        material.component = componentMap[mid];
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
        this.setMaterialList(materialList.concat(ms));
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
        this.getCode();
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
    preview = (value: boolean) => {
        if (value) {
            this.getCode();
            if (!this.pageProps) {
                message.error('请先设置页面属性');
            }
        }
        this.setState({
            showCode: value,
        });
    }

    /**
     * 获取代码
     */
    getCode = () => {
        if (this.pageProps && this.state.showCode) {
            const values = this.pageProps.props.form.getFieldsValue();
            if (values.namespace && values.name) {
                const { materialList } = this.state;
                this.setState({
                    codeLoading: true,
                });
                preview({
                    ...values,
                    materials: this.getMaterilTree(materialList),
                }).then(res => {
                    this.setState({
                        code: res.data.data,
                        codeLoading: false,
                        codeTip: '',
                    });
                });
            }
        } else {
            this.setState({
                codeTip: '请设置页面属性',
            });
        }
    }

    /**
     * 生成
     */
    create = () => {
        const { materialList } = this.state;
        if (materialList.length < 2) {
            message.error('请添加组件');
            return;
        }
        if (!this.pageProps) {
            message.error('请设置页面属性');
            return;
        }
        Modal.confirm({
            title: '确认生成',
            onOk: () => {
                this.pageProps.props.form.validateFields((err, values: IPageProps) => {
                    create({
                        ...values,
                        materials: this.getMaterilTree(materialList),
                    }).then(() => {
                        message.success('成功生成代码');
                    });
                });
            },
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

    /**
     * 打开快速配置弹窗
     */
    openFastBuild = () => {
        this.setState({
            fastVisible: true,
            fastKey: Math.random(),
        });
    }

    /**
     * 关闭快速配置弹窗
     */
    closeFastBuild = () => {
        this.setState({
            fastVisible: false,
        });
    }

    /**
     * 快速配置
     */
    fastBuild = ({ project, values }) => {
        let componentsList;
        if (project === '油涟后台') {
            componentsList = YLComponentsList;
        } else {
            componentsList = LYTComponentsList;
        }
        const list = componentsList.filter(item => (values[item.tag] || !item.name));
        const ms = [];
        list.forEach(item => {
            // 根目录
            if (item.id === 1) {
                ms.push({ ...BaseContentMaterial, ...item });
            } else {
                // 查找物料组件列表
                materials.forEach(m => {
                    if (m.tag === item.tag) {
                        if (m.project) {
                            if (m.project === project) {
                                ms.push({ ...m, ...item });
                            }
                        } else {
                            ms.push({ ...m, ...item });
                        }
                    }
                });
            }
        });
        this.setMaterialList(ms);
        this.closeFastBuild();
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
        const { materialList, material, id, loadVisible, pageList, loadPageIndex, modalList, saveVisible, saveName, code, codeLoading, showCode, codeTip, fastVisible, fastKey } = this.state;
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
                        <Button type="primary" style={{ marginRight: '10px', backgroundColor: '#67c23a', borderColor: '#67c23a' }} onClick={this.openFastBuild}>快速配置</Button>
                        <Button type="primary" style={{ marginRight: '10px' }} onClick={this.create}>生成</Button>
                        <Button type="primary" onClick={() => this.openSave()} style={{ marginRight: '10px' }}>保存</Button>
                        <Button type="primary" onClick={this.openLoad} style={{ marginRight: '10px' }}>载入</Button>
                        <Button type="danger" onClick={this.clear} style={{ marginRight: '10px' }}>清空</Button>
                        预览 <Switch checked={showCode} onChange={this.preview} />
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
                <div className={styles.edit} style={{ width: showCode ? '500px' : '360px' }}>
                    <div className={styles.editBox}>
                        <Tabs defaultActiveKey="1" animated={false}>
                            <TabPane tab="组件属性" key="1">
                                <MaterialEidt
                                    material={material}
                                    modalList={modalList}
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
                    {
                        showCode && (
                            <div className={styles.codeBox}>
                                {
                                    codeTip && <div className={styles.codeTip}>{codeTip}</div>
                                }
                                <Tabs animated={false}>
                                    {
                                        files.map(file => (
                                            <TabPane tab={file.file} key={file.file}>
                                                <Spin spinning={codeLoading}>
                                                    <div className={styles.codeContent}>
                                                        <pre>{file.code}</pre>
                                                    </div>
                                                </Spin>
                                            </TabPane>
                                        ))
                                    }
                                </Tabs>
                            </div>
                        )
                    }
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

                <FastBuild
                    visible={fastVisible}
                    key={fastKey}
                    onCancel={this.closeFastBuild}
                    onOk={this.fastBuild} />
            </div>
        );
    }
}

export default connect(({ global }: { global: GlobalModelState }) => ({
    global,
}))(Making);
