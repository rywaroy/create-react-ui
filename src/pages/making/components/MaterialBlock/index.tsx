import React, { useState } from 'react';
import { Icon } from 'antd';
import { IMaterial } from '@/types/making';
import styles from './index.less';

interface IProps {
  material: IMaterial;
  visual?: boolean;
  selectMaterial: (item: IMaterial) => void;
  deleteMaterial: (id: number) => void;
  dropAdd: (index: number, pid: number, id?: number) => void;
  dorpMove: (cid: number, tid: number) => void;
  dragStart: (id: number) => void;
  dragEnter: (id: number) => void;
  dragEnd: () => void;
}

const MaterialBlock: React.FC<IProps> = (props) => {
    const { material, visual } = props;
    const {
        component: MaterialComponent,
        props: materialProp,
        active,
        children,
        id,
        haveChildren,
        pid,
        defaultProps,
        ghost,
    } = material;

    const [draggable, setDraggable] = useState<boolean>(false);

    const selectMaterial = (e: any) => {
        e.stopPropagation();
        props.selectMaterial(props.material);
    };

    const deleteMaterial = (e: any) => {
        e.stopPropagation();
        props.deleteMaterial(id);
    };

    const drop = (event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();
        const index = event.dataTransfer.getData('index');
        const cid = event.dataTransfer.getData('id');
        // 添加
        if (index) {
            if (haveChildren) {
                props.dropAdd(Number(index), id);
            } else {
                props.dropAdd(Number(index), Number(pid), id);
            }
            event.dataTransfer.clearData('index');
        }
        // 移动
        if (cid) {
            props.dorpMove(Number(cid), id);
            event.dataTransfer.clearData('id');
        }
    };

    const dragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();
    };

    const dragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        props.dragEnter(id);
    };

    const dragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const drag = (event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.dataTransfer.setData('id', String(id));
        props.dragStart(id);
    };

    const dragDown = () => {
        setDraggable(true);
    };

    const dragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setDraggable(false);
        props.dragEnd();
    };

    return (
        <MaterialComponent
            draggable={draggable}
            className={`${styles.block} ${id > 1 ? styles.pageBox : ''} ${active ? styles.active : ''} ${visual ? styles.visual : styles.unvisual} ${ghost ? styles.ghost : ''}`}
            onDrop={drop}
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDragStart={drag}
            onDragEnd={dragEnd}
            onClick={(e: any) => selectMaterial(e)}
            {...materialProp}
            {...defaultProps}
        >
            {
                children && children.map((child) => (
                    <MaterialBlock
                        material={child}
                        visual={visual}
                        key={child.id}
                        selectMaterial={(m) => props.selectMaterial(m)}
                        deleteMaterial={(id) => props.deleteMaterial(id)}
                        dropAdd={(index, pid, id) => props.dropAdd(index, pid, id)}
                        dorpMove={(cid, tid) => props.dorpMove(cid, tid)}
                        dragStart={(id) => props.dragStart(id)}
                        dragEnter={(id) => props.dragEnter(id)}
                        dragEnd={() => props.dragEnd()}
                    />
                ))
            }
            {props.children}
            {defaultProps && defaultProps.children}
            {materialProp && materialProp.children}
            {
                id !== 1 && active
                && (
                    <div className={styles.dragIcon} onMouseDown={dragDown}>
                        <Icon type="drag" style={{ color: '#fff', fontSize: '20px', cursor: 'move' }} />
                    </div>
                )
            }
            {
                id !== 1 && active
                && (
                    <div className={styles.deleteIcon}>
                        <Icon type="delete" style={{ color: '#fff', fontSize: '20px' }} onClick={(e) => deleteMaterial(e)} />
                    </div>
                )
            }
        </MaterialComponent>
    );
};

export default MaterialBlock;
