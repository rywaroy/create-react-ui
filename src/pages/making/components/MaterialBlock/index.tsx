import React, { useState } from 'react';
import { Icon } from 'antd';
import { IMaterial } from '@/types/making';
import styles from './index.less';

interface IProps {
  material: IMaterial;
  visual?: boolean;
  selectMaterial: (item: IMaterial) => void;
  deleteMaterial: (id: number) => void;
  saveMaterial: (id: number) => void;
  copyMaterial: (id: number) => void;
  up: (id: number) => void;
  down: (id: number) => void;
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
        defaultProps,
        ghost,
        haveWrap = true,
    } = material;

    const [draggable, setDraggable] = useState<boolean>(false);

    const selectMaterial = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        props.selectMaterial(props.material);
    };

    const deleteMaterial = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        props.deleteMaterial(id);
    };

    const copyMaterial = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        props.copyMaterial(id);
    };

    const saveMaterial = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        props.saveMaterial(id);
    };

    const drop = (event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();
        props.dragEnd();
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

    const up = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        props.up(id);
    };

    const down = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        props.down(id);
    };

    const setProps = {
        draggable,
        className: `block ${id < 1 ? 'pageBox' : ''} ${active ? 'active' : ''} ${visual ? 'visual' : 'unvisual'} ${ghost ? 'ghost' : ''} ${materialProp.className ? materialProp.className : ''}`,
        onDrop: drop,
        onDragOver: dragOver,
        onDragEnter: dragEnter,
        onDragLeave: dragLeave,
        onDragStart: drag,
        onDragEnd: dragEnd,
        onClick: (e: any) => selectMaterial(e),
    };

    const dragIcon = id !== 1 && active && (
        <div className={styles.dragIcon} onMouseDown={dragDown}>
            <Icon type="drag" style={{ color: '#fff', fontSize: '20px', cursor: 'move' }} />
        </div>
    );

    const optIcon = id !== 1 && active && (
        <div className={styles.blockBottom}>
            <div className={styles.blockBottomIcon}>
                <Icon type="save" style={{ color: '#fff', fontSize: '16px' }} onClick={(e) => saveMaterial(e)} />
            </div>
            <div className={styles.blockBottomIcon}>
                <Icon type="copy" style={{ color: '#fff', fontSize: '16px' }} onClick={(e) => copyMaterial(e)} />
            </div>
            <div className={`${styles.blockBottomIcon} hideIcon`}>
                <Icon type="arrow-up" style={{ color: '#fff', fontSize: '16px' }} onClick={(e) => up(e)} />
            </div>
            <div className={`${styles.blockBottomIcon} hideIcon`}>
                <Icon type="arrow-down" style={{ color: '#fff', fontSize: '16px' }} onClick={(e) => down(e)} />
            </div>
            <div className={styles.blockBottomIcon}>
                <Icon type="delete" style={{ color: '#fff', fontSize: '16px' }} onClick={(e) => deleteMaterial(e)} />
            </div>
        </div>
    );

    const mc = (
        <MaterialComponent
            {...materialProp}
            {...defaultProps}
            {...(!haveWrap && setProps)}
        >
            {
                children && children.map((child) => (
                    <MaterialBlock
                        material={child}
                        visual={visual}
                        key={child.id}
                        selectMaterial={(m) => props.selectMaterial(m)}
                        deleteMaterial={(id) => props.deleteMaterial(id)}
                        saveMaterial={(id) => props.saveMaterial(id)}
                        copyMaterial={(id) => props.copyMaterial(id)}
                        up={(id) => props.up(id)}
                        down={(id) => props.down(id)}
                        dragStart={(id) => props.dragStart(id)}
                        dragEnter={(id) => props.dragEnter(id)}
                        dragEnd={() => props.dragEnd()}
                    />
                ))
            }
            {props.children}
            {defaultProps && defaultProps.children}
            {materialProp && materialProp.children}
            {!haveWrap && dragIcon}
            {!haveWrap && optIcon}
        </MaterialComponent>
    );

    return (
        haveWrap
            ? (
                <div
                    draggable={draggable}
                    className={`block ${id < 1 ? 'pageBox' : ''} ${active ? 'active' : ''} ${visual ? 'visual' : 'unvisual'} ${ghost ? 'ghost' : ''} ${materialProp.className ? materialProp.className : ''}`}
                    onDrop={drop}
                    onDragOver={dragOver}
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDragStart={drag}
                    onDragEnd={dragEnd}
                    onClick={(e: any) => selectMaterial(e)}>
                    {mc}
                    {dragIcon}
                    {optIcon}
                </div>
            )
            : mc
    );
};

export default MaterialBlock;
