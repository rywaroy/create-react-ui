import React from 'react';
import { Switch } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import { IMaterial } from '@/types/making';
import MaterialBlock from '../MaterialBlock';
import styles from './index.less';

interface IProps {
    materialList: IMaterial[];
    setMaterialList: (materials: IMaterial[]) => void;
    setMaterial: (material: IMaterial, materials?: IMaterial[]) => void;
    save: (id?: number) => void;
}

interface IState {
    visual: boolean;
    mid: number;
}

class MaterialContent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            visual: true,
            mid: 0,
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
        this.props.setMaterial(material, materials);
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
        this.props.setMaterial(null, materials);
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
        cm.active = false;
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
        materials.splice(index + 1, 0, ...copyList);
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
     * 上移
     */
    upMaterial = (id: number) => {
        const materials = [...this.props.materialList];
        const index = this.findMaterialIndex(materials, id);
        if (index === 0) {
            return;
        }
        const material = materials.splice(index, 1)[0];
        materials.splice(index - 1, 0, material);
        this.props.setMaterialList(materials);
    }

    /**
     * 下移
     */
    downMaterial = (id: number) => {
        const materials = [...this.props.materialList];
        const index = this.findMaterialIndex(materials, id);
        if (index === materials.length - 1) {
            return;
        }
        const material = materials.splice(index, 1)[0];
        materials.splice(index + 1, 0, material);
        this.props.setMaterialList(materials);
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

    render() {
        const { visual } = this.state;
        const { materialList } = this.props;
        const materials = this.getMaterilTree(materialList);

        return (
            <div className={styles.content}>
                <div className={styles.display}>
                    展示 <Switch checked={!visual} onChange={value => this.setState({ visual: !value })} />
                </div>
                {
                    materials.map((item) => (
                        <MaterialBlock
                            key={item.id}
                            visual={visual}
                            material={item}
                            selectMaterial={(m) => this.props.setMaterial(m)}
                            deleteMaterial={(id) => this.deleteMaterial(id)}
                            up={(id) => this.upMaterial(id)}
                            down={(id) => this.downMaterial(id)}
                            saveMaterial={(id) => this.props.save(id)}
                            copyMaterial={(id) => this.copyMaterial(id)}
                            dragStart={this.dragStart}
                            dragEnter={this.dragEnter}
                            dragEnd={this.dragEnd}
                        />
                    ))
                }
            </div>
        );
    }
}

export default MaterialContent;
