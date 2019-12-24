import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';

class Code extends Component {

    render() {
        return (
            <div>
                1
            </div>
        );
    }
}

export default connect(({ global }) => ({ global }))(Code);