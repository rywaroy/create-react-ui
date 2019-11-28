import React, { Component } from 'react';
import { connect } from 'dva';
import TemplateItem from './components/TemplateItem';

class Template extends Component {

    render() {
        return (
            <div>
                <ul className="clearfix">
                    <TemplateItem
                        title="默认react模板"
                        intro="包含index.js 可配置变量名"
                        imgClassName="defaultImg"/>
                </ul>
            </div>
        );
    }
}

export default connect(({ global }) => ({ global }))(Template);