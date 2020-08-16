import React from 'react';
import { connect } from 'dva';
import cloneDeep from 'lodash/cloneDeep';
import { GlobalModelState } from '@/models/global';
import materials, { baseContent } from '@/components/materials';
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

let id = 1;

class Making extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            materialList: [baseContent],
            material: null,
            id: 0,
            // codeVisible: false,
            // codeKey: Math.random(),
            // code: '',
        };
    }

    /**
     * 添加物料组件
     */
    addMaterial = (item: IMaterial, pid?: number, cid?: number) => {
        const material = cloneDeep(item);
        const materials = cloneDeep(this.state.materialList);
        let index = 0;
        materials.forEach((item, i) => {
            item.active = false;
            if (item.id === cid) {
                index = i;
            }
        });
        const key = ++id;
        material.id = key;
        material.active = true;
        material.pid = pid || 1;
        // 没有child id 表示添加物料组件
        if (!cid) {
            materials.push(material);
            if (material.children) {
                const children = [...material.children];
                children.forEach((child) => {
                    child = cloneDeep(child); // 防止子组件相同引用地址
                    child.active = false;
                    child.pid = key;
                    child.id = ++id;
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
                    child.id = ++id;
                    return child;
                });
                materials.splice(index + 1, 0, ...children);
                delete material.children;
            }
        }
        this.selectMaterial(material, materials);
    };

    // 选中物料组件
    selectMaterial = (material: IMaterial, materials?: IMaterial[]) => {
        if (!materials) {
            materials = [...this.state.materialList];
        }
        materials.forEach((item) => {
            if (item.id === material.id) {
                item.active = true;
            } else {
                item.active = false;
            }
        });
        this.setState({
            material,
            id: material.id,
            materialList: materials,
        });
    };

    // 删除物料组件
    deleteMaterial = (cid: number) => {
        let materials = cloneDeep(this.state.materialList);
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
        this.setState({
            material: null,
            id: 0,
            materialList: materials,
        });
    }

    dorpMove = (cid: number, tid: number) => {
        const materials = [...this.state.materialList];
        const cIndex = this.findMaterialIndex(materials, cid);
        const mc = materials.splice(cIndex, 1)[0];
        const tIndex = this.findMaterialIndex(materials, tid);
        const tc = materials[tIndex];
        // 判断目标物料组件是否可以有子物料
        if (tc.haveChildren) {
            mc.pid = tc.id; // 改变pid
            materials.push(mc); // 插入到最后一个
        } else {
            mc.pid = tc.pid; // 改变未目标pid
            materials.splice(tIndex, 0, mc); // 在目标物料前插入
        }
        this.setState({
            material: mc,
            id: mc.id,
            materialList: materials,
        });
    }

    findMaterialIndex(materials: IMaterial[], id: number): number {
        for (let i = 0; i < materials.length; i++) {
            if (materials[i].id === id) {
                return i;
            }
        }
        return 0;
    }

    /**
     * 清空
     */
    clear = () => {
        this.setState({
            material: null,
            id: 0,
            materialList: [baseContent],
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
                        materialList={materialList}
                        selectMaterial={this.selectMaterial}
                        deleteMaterial={this.deleteMaterial}
                        addMaterial={this.addMaterial}
                        dorpMove={this.dorpMove}
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
