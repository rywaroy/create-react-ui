import React, { Component } from 'react';
import TemplateItem from '@/components/TemplateItem';

class TableCode extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    addTableCode = () => {

    }

    render() {
        return (
            <div>
                <TemplateItem
                    title="table组件配置对象"
                    intro=""
                    imgClassName="customImg"
                    add={this.addTableCode}/>
            </div>
        );
    }
}

export default TableCode;