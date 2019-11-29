import React, { Component } from 'react';
import { connect } from 'dva';
import DefaultTemplate from './components/DefaultTemplate';

class Template extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <div className="list">
                    <DefaultTemplate folders={this.props.global.folders}/>
                </div>
            </div>
        );
    }
}

export default connect(({ global }) => ({ global }))(Template);