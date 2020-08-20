import React from 'react';
import { Button, Switch, Modal, Input, message } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import { IMaterial } from '@/types/making';
import MaterialBlock from '../MaterialBlock';
import styles from './index.less';

interface IProps {
    materialList: IMaterial[];
    setMaterialList: (materials: IMaterial[]) => void;
    setMaterial: (material: IMaterial, id: number) => void;
    clear: () => void;
    save: (name: string, id?: number) => void;
}

interface IState {
    visual: boolean;
    mid: number;
    saveName: string;
    saveId: number | null;
    saveVisible: boolean;
}

class MaterialContent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            visual: true,
            mid: 0,
            saveName: '',
            saveId: null,
            saveVisible: false,
        };
        this.dragEnter = debounce(this.dragEnter, 300);
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

    create = () => {

    }

    /**
     * 选中物料组件
     */
    selectMaterial = (material: IMaterial, materials?: IMaterial[]) => {
        if (!materials) {
            materials = [...this.props.materialList];
        }
        materials.forEach((item) => {
            if (item.id === material.id) {
                item.active = true;
            } else {
                item.active = false;
            }
        });
        this.props.setMaterialList(materials);
        this.props.setMaterial(material, material.id);
    };

    /**
     * 添加物料组件
     */
    addMaterial = (item: IMaterial, pid?: number, cid?: number, ghost?: boolean) => {
        const material = cloneDeep(item);
        const materials = cloneDeep(this.props.materialList);
        let index = 0;
        materials.forEach((item, i) => {
            item.active = false;
            if (item.id === cid) {
                index = i;
            }
        });
        const key = Math.random();
        material.id = key;
        material.active = true;
        material.pid = pid || 1;
        material.ghost = !!ghost;
        // 没有child id 表示添加物料组件
        if (!cid) {
            materials.push(material);
            if (material.children) {
                const children = [...material.children];
                children.forEach((child) => {
                    child = cloneDeep(child); // 防止子组件相同引用地址
                    child.active = false;
                    child.pid = key;
                    child.id = Math.random();
                    materials.push(child);
                });
                delete material.children;
            }
        } else { // 有child id 表示拖拽插入指定child id上方
            materials.splice(index, 0, material);
            if (material.children) {
                let children = [...material.children];
                children = children.map((child) => {
                    child = cloneDeep(child); // 防止子组件相同引用地址
                    child.active = false;
                    child.pid = key;
                    child.id = Math.random();
                    return child;
                });
                materials.splice(index + 1, 0, ...children);
                delete material.children;
            }
        }
        if (ghost) {
            this.setState({
                mid: key,
            });
        }
        this.selectMaterial(material, materials);
    };

    /**
     * 删除物料组件
     */
    deleteMaterial = (cid: number) => {
        let materials = cloneDeep(this.props.materialList);
        const ids: number[] = [cid];
        function findMaterial(pid: number) {
            materials!.forEach((material) => {
                if (material.pid === pid) {
                    ids.push(material.id);
                    findMaterial(material.id);
                }
            });
        }
        findMaterial(cid);
        materials = materials.filter((item) => ids.indexOf(item.id) === -1);
        this.props.setMaterialList(materials);
        this.props.setMaterial(null, 0);
    }

    /**
     * 复制物料组件
     */
    copyMaterial = (cid: number) => {
        const materials = cloneDeep(this.props.materialList);
        const index = this.findMaterialIndex(materials, cid);
        const cm = cloneDeep(materials[index]);
        const newId = Math.random();
        cm.id = newId;
        const copyList: IMaterial[] = [cm];
        function findMaterial(pid: number, npid: number) {
            materials.forEach((material) => {
                if (material.pid === pid) {
                    const m = cloneDeep(material);
                    const mnewId = Math.random();
                    m.id = mnewId;
                    m.pid = npid;
                    copyList.push(m);
                    findMaterial(material.id, mnewId);
                }
            });
        }
        findMaterial(cid, newId);
        materials.splice(index, 0, ...copyList);
        this.props.setMaterialList(materials);
    }

    findMaterialIndex(materials: IMaterial[], id: number): number {
        if (!id) {
            return 0;
        }
        for (let i = 0; i < materials.length; i++) {
            if (materials[i].id === id) {
                return i;
            }
        }
        return 0;
    }

    /**
     * 开始拖拽
     */
    dragStart = (id: number) => {
        this.setState({
            mid: id,
        });
        // 延时200毫秒，ui优化
        setTimeout(() => {
            const materials = [...this.props.materialList];
            const index = this.findMaterialIndex(materials, id);
            materials[index].ghost = true;
            this.props.setMaterialList(materials);
        }, 100);
    }

    /**
     * 拖拽进入元素
     */
    dragEnter = (id: number) => {
        const { mid } = this.state;
        const materials = [...this.props.materialList];
        if (mid) {
            const cIndex = this.findMaterialIndex(materials, mid);
            const mc = materials.splice(cIndex, 1)[0]; // 被拖拽material
            const tIndex = this.findMaterialIndex(materials, id);
            const tc = materials[tIndex]; // 目标material
            // 判断目标物料组件是否可以有子物料
            if (tc.haveChildren) {
                mc.pid = tc.id; // 改变pid
                materials.push(mc); // 插入到最后一个
            } else {
                mc.pid = tc.pid; // 改变未目标pid
                materials.splice(tIndex, 0, mc); // 在目标物料前插入
            }
            this.props.setMaterialList(materials);
        }
    }

    dragEnd = () => {
        const materials = [...this.props.materialList];
        materials.forEach(item => {
            item.ghost = false;
        });
        this.setState({
            mid: 0,
        });
        this.props.setMaterialList(materials);
    }

    setMaterial = (material: IMaterial) => {
        this.addMaterial(material, undefined, undefined, true);
    }

    /**
     * 打开保存弹窗
     */
    openSave = (id?: number) => {
        if (this.props.materialList.length < 2) {
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
        });
    }

    /**
     * 确认保存
     */
    save = () => {
        const { saveId, saveName } = this.state;
        if (!saveName) {
            message.error('请输入保存名字');
            return;
        }
        this.props.save(saveName, saveId);
        this.closeSave();
    }

    render() {
        const { visual, saveName, saveVisible } = this.state;
        const { materialList } = this.props;
        const materials = this.getMaterilTree(materialList);

        return (
            <>
                <div className={`light-theme ${styles.opt}`}>
                    <Button type="primary" onClick={this.create} style={{ marginRight: '20px' }}>生成</Button>
                    <Button type="primary" onClick={() => this.openSave()} style={{ marginRight: '20px' }}>保存</Button>
                    <Button type="primary" onClick={this.props.clear} style={{ marginRight: '20px' }}>清空</Button>
                    展示 <Switch checked={visual} onChange={value => this.setState({ visual: value })} />
                </div>
                <div className={styles.content}>
                    {
                        materials.map((item) => (
                            <MaterialBlock
                                key={item.id}
                                visual={visual}
                                material={item}
                                selectMaterial={(m) => this.selectMaterial(m)}
                                deleteMaterial={(id) => this.deleteMaterial(id)}
                                copyMaterial={(id) => this.copyMaterial(id)}
                                dragStart={this.dragStart}
                                dragEnter={this.dragEnter}
                                dragEnd={this.dragEnd}
                            />
                        ))
                    }
                </div>
                <Modal
                    title="保存"
                    width="400px"
                    visible={saveVisible}
                    onCancel={this.closeSave}
                    onOk={this.save}>
                    <Input placeholder="命名" value={saveName} onChange={(e) => this.setState({ saveName: e.target.value })} />
                </Modal>
            </>
        );
    }
}

export default MaterialContent;
