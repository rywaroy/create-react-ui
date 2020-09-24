import React, { useState, useCallback } from 'react';
import { Icon } from 'antd';
import { IMaterial } from '@/types/making';

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
        props: materialProps,
        active,
        children,
        id,
        defaultProps = {},
        ghost,
        haveWrap = true,
    } = material;

    const [draggable, setDraggable] = useState<boolean>(false);

    const selectMaterial = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        props.selectMaterial(props.material);
    }, []);

    const deleteMaterial = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        props.deleteMaterial(id);
    }, [id]);

    const copyMaterial = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        props.copyMaterial(id);
    }, [id]);

    const saveMaterial = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        props.saveMaterial(id);
    }, [id]);

    const drop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();
        props.dragEnd();
    }, []);

    const dragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();
    }, []);

    const dragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        props.dragEnter(id);
    }, [id]);

    const dragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
    }, []);

    const drag = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.dataTransfer.setData('id', String(id));
        props.dragStart(id);
    }, [id]);

    const dragDown = useCallback(() => {
        setDraggable(true);
    }, []);

    const dragEnd = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setDraggable(false);
        props.dragEnd();
    }, []);

    const up = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        props.up(id);
    }, [id]);

    const down = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        props.down(id);
    }, [id]);

    const dragIcon = id !== 1 && active && (
        <span className="dragIcon" onMouseDown={dragDown}>
            <Icon type="drag" style={{ color: '#fff', fontSize: '20px', cursor: 'move' }} />
        </span>
    );

    const optIcon = id !== 1 && active && (
        <span className="blockBottom">
            <span className="blockBottomIcon hideIcon">
                <Icon type="save" style={{ color: '#fff', fontSize: '16px' }} onClick={(e) => saveMaterial(e)} />
            </span>
            <span className="blockBottomIcon">
                <Icon type="copy" style={{ color: '#fff', fontSize: '16px' }} onClick={(e) => copyMaterial(e)} />
            </span>
            <span className="blockBottomIcon hideIcon">
                <Icon type="arrow-up" style={{ color: '#fff', fontSize: '16px' }} onClick={(e) => up(e)} />
            </span>
            <span className="blockBottomIcon hideIcon">
                <Icon type="arrow-down" style={{ color: '#fff', fontSize: '16px' }} onClick={(e) => down(e)} />
            </span>
            <span className="blockBottomIcon">
                <Icon type="delete" style={{ color: '#fff', fontSize: '16px' }} onClick={(e) => deleteMaterial(e)} />
            </span>
        </span>
    );

    return (
        <MaterialComponent
            {...(haveWrap ? { props: materialProps } : materialProps)}
            {...(haveWrap ? { defaultprops: defaultProps } : defaultProps)}
            draggable={draggable}
            className={`block ${id < 1 ? 'pageBox' : ''} ${active ? 'active' : ''} ${visual ? 'visual' : 'unvisual'} ${ghost ? 'ghost' : ''} ${materialProps.className ? materialProps.className : ''} ${defaultProps.className ? defaultProps.className : ''}`}
            onDrop={drop}
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDragStart={drag}
            onDragEnd={dragEnd}
            onClick={(e: any) => selectMaterial(e)}
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
            {materialProps && materialProps.children}
            {dragIcon}
            {optIcon}
        </MaterialComponent>
    );
};

export default MaterialBlock;
