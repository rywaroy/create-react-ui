import React from 'react';
import { connect } from 'dva';
import { GlobalModelState } from '@/models/global';
import DefaultTemplate from './components/DefaultTemplate';
import UmiTemplate from './components/UmiTemplate';
import CustomTemplate from './components/CustomTemplate';

interface IProps {
    global: GlobalModelState;
    dispatch: Function;
}

const Template: React.FC<IProps> = (props) => {
    const { folders } = props.global;

    const updateFiles = () => {
        props.dispatch({
            type: 'global/updateFiles',
        });
    };

    return (
        <div className="base-content">
            <div className="template-list">
                <DefaultTemplate folders={folders} updateFiles={updateFiles} />
                <UmiTemplate folders={folders} updateFiles={updateFiles} />
                <CustomTemplate folders={folders} updateFiles={updateFiles} />
            </div>
        </div>
    );
};

export default connect(({ global }: { global: GlobalModelState }) => ({ global }))(Template);
