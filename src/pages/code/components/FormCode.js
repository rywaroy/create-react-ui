import React, { Component } from 'react';
import TemplateItem from '@/components/TemplateItem';

class FormCode extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <div>
                <TemplateItem
                    title="form组件配置对象"
                    intro="配合油涟组件GenerateForm使用"
                    imgClassName="formImg"/>
            </div>
        );
    }
}

export default FormCode;