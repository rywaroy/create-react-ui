import React from 'react';
import { connect } from 'dva';
import DefaultTemplate from './components/DefaultTemplate';
import UmiTemplate from './components/UmiTemplate';
import CustomTemplate from './components/CustomTemplate';


function Template(props) {

    const { folders } = props.global;

    const updateFiles = () => {
        props.dispatch({
            type: 'global/updateFiles'
        });
    };

    return (
        <div>
            <div className="template-list">
                <DefaultTemplate folders={folders} updateFiles={updateFiles}/>
                <UmiTemplate folders={folders} updateFiles={updateFiles}/>
                <CustomTemplate folders={folders} />
            </div>
        </div>
    );
}

export default connect(({ global }) => ({ global }))(Template);