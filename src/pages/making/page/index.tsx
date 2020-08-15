import React from 'react';
import { connect } from 'dva';
import cloneDeep from 'lodash/cloneDeep';
import { GlobalModelState } from '@/models/global';
import MaterialList from '@/components/MaterialList';
import materials, { baseContent } from '@/components/materials';
import { IMaterial } from '@/types/making';
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
            codeVisible: false,
            codeKey: Math.random(),
            code: '',
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
        return (
            <div className={styles.pageWrap}>
                <div className={styles.material}>
                    <MaterialList
                        materials={materials}
                        addMaterial={this.addMaterial} />
                </div>
                <div className={styles.pageContent} />
                <div className={styles.edit} />
            </div>
        );
    }
}

export default connect(({ global }: { global: GlobalModelState }) => ({
    global,
}))(Making);
