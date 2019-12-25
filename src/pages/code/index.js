import React, { Component } from 'react';
import { connect } from 'dva';
import TableCode from './components/TableCode';

class Code extends Component {

    render() {
        const { folders } = this.props.global;
        return (
            <div>
                <div className="template-list">
                    <TableCode folders={folders}/>
                </div>
            </div>
        );
    }
}

export default connect(({ global }) => ({ global }))(Code);