import React, { Component } from 'react';
import TemplateItem from './TemplateItem';

class DefaultTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    addDefaultTemplate = () => {
        console.log(1);
    }

    render() {
        return (
            <div>
                <TemplateItem
                    title="默认react模板"
                    intro="包含index.js 可配置变量名"
                    imgClassName="defaultImg"
                    add={this.addDefaultTemplate}/>
            </div>
        );
    }
}

export default DefaultTemplate;