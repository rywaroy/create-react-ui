import React, { Component } from 'react';
import { connect } from 'dva';
import DefaultTemplate from './components/DefaultTemplate';
import UmiTemplate from './components/UmiTemplate';
import styles from './index.less';

class Template extends Component {

    render() {
        const { folders } = this.props.global;
        return (
            <div>
                <div className={styles.list}>
                    <DefaultTemplate folders={folders}/>
                    <UmiTemplate folders={folders}/>
                </div>
            </div>
        );
    }
}

export default connect(({ global }) => ({ global }))(Template);