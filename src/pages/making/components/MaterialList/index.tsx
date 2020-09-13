import React, { Component } from 'react';
import { Collapse } from 'antd';
import { IMaterial } from '@/types/making';
import styles from './index.less';

const { Panel } = Collapse;

interface IProps {
    materials: IMaterial[];
    addMaterial: (material: IMaterial) => void;
    setAddMaterial: (material: IMaterial) => void;
}

interface IMaterialList {
    title: string;
    id: number;
    children: IMaterial[];
}

interface IState {
    materialList: IMaterialList[];
}

class MaterialList extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            materialList: [],
        };
    }

    drag = (event: React.DragEvent<HTMLDivElement>, material: IMaterial) => {
        // @ts-ignore
        event.dataTransfer.setData('index', event.target.getAttribute('data-index'));
        this.props.setAddMaterial(material);
    }

    /**
     * 添加组件
     */
    addMaterial = (material: IMaterial) => {
        this.props.addMaterial(material);
    }

    componentDidMount() {
        const { materials } = this.props;
        const materialList = [
            { title: '基础组件', id: 1, children: [] },
            { title: 'antd组件', id: 3, children: [] },
        ];
        const projectMap = {};
        materials.forEach(item => {
            if (item.from === '') {
                materialList[0].children.push(item);
            } else if (item.from === 'antd') {
                materialList[1].children.push(item);
            } else {
                if (!item.project) {
                    item.project = '其他业务组件';
                }
                if (!projectMap[item.project]) {
                    projectMap[item.project] = [];
                }
                projectMap[item.project].push(item);
            }
        });
        const project = [];
        Object.keys(projectMap).forEach(key => {
            project.push({
                title: key,
                id: Math.random(),
                children: projectMap[key],
            });
        });
        materialList.splice(1, 0, ...project);
        this.setState({
            materialList,
        });
    }

    render() {
        const { materialList } = this.state;

        return (
            <div>
                <Collapse accordion className={styles.collapse} defaultActiveKey="油涟后台">
                    {
                        materialList.map(item => (
                            <Panel header={item.title} key={item.title}>
                                {
                                    item.children.map((material, index) => (
                                        <div
                                            key={material.tag}
                                            className={styles.materialItem}
                                            data-index={index}
                                            draggable
                                            onDragStart={(event) => this.drag(event, material)}
                                            onClick={() => this.addMaterial(material)}>
                                            {material.name}
                                            <span>&lt;{material.tag} /&gt;</span>
                                        </div>
                                    ))
                                }
                            </Panel>
                        ))
                    }
                </Collapse>
            </div>
        );
    }
}

export default MaterialList;
