import React, { Component } from 'react';
import { Select } from 'antd';
import { IMaterial } from '@/types/making';
import styles from './index.less';

interface IProps {
    materials: IMaterial[];
    addMaterial: (material: IMaterial) => void;
}

interface IState {
    froms: string[],
    projects: string[],
    from: string;
    project: string;
}

class MaterialList extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            froms: [],
            projects: [],
            from: '',
            project: '',
        };
    }

    drag = (event: React.DragEvent<HTMLDivElement>) => {
        // @ts-ignore
        event.dataTransfer.setData('index', event.target.getAttribute('data-index'));
    }

    /**
     * 添加组件
     */
    addMaterial = (material: IMaterial) => {
        this.props.addMaterial(material);
    }

    /**
     * 切换筛选
     */
    fromChange = (value: string) => {
        this.setState({
            from: value,
        });
    }

    /**
     * 切换筛选
     */
    projectChange = (value: string) => {
        this.setState({
            project: value,
        });
    }

    /**
     * 筛选组件列表
     */
    getList(from: string, project: string) {
        const { materials } = this.props;
        const materialList = materials.filter(material => {
            if ((!from || from === 'all' || from === material.from) && (!project || project === 'all' || material.project?.indexOf(project) > -1)) {
                return true;
            }
            return false;
        });
        return materialList;
    }

    componentDidMount() {
        const { materials } = this.props;
        const froms = { all: true };
        const projects = { all: true };
        materials.forEach(item => {
            if (item.from && !froms[item.from]) {
                froms[item.from] = true;
            }
            if (item.project) {
                const project = item.project.split(',');
                project.forEach(p => {
                    if (!projects[p]) {
                        projects[p] = true;
                    }
                });
            }
        });
        this.setState({
            froms: Object.keys(froms),
            projects: Object.keys(projects),
        });
    }

    render() {
        const { froms, projects, from, project } = this.state;
        const materialList = this.getList(from, project);

        return (
            <div className={styles.materialList}>
                <div className={styles.materialTitle}>筛选</div>
                <div className={styles.materialFilter}>
                    <Select
                        placeholder="请选择组件"
                        style={{ width: '48%', marginRight: '1%' }}
                        value={from}
                        onChange={this.fromChange}>
                        {
                            froms.map(item => (
                                <Select.Option value={item}>{item}</Select.Option>
                            ))
                        }
                    </Select>
                    <Select
                        placeholder="请选择项目"
                        style={{ width: '48%' }}
                        value={project}
                        onChange={this.projectChange}>
                        {
                            projects.map(item => (
                                <Select.Option value={item}>{item}</Select.Option>
                            ))
                        }
                    </Select>
                </div>
                <div className={styles.materialTitle}>组件列表</div>
                {
                    materialList.map((item, index) => (
                        <div
                            key={item.tag}
                            className={styles.materialItem}
                            data-index={index}
                            draggable
                            onDragStart={this.drag}
                            onClick={() => this.addMaterial(item)}>
                            {item.name}
                            <span>&lt;{item.tag} /&gt;</span>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default MaterialList;
