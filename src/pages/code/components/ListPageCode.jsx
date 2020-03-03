import React, { Component } from 'react';
import TemplateItem from '@/components/TemplateItem';

class ListPageCode extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <TemplateItem
                title="列表页面配置对象"
                intro=""
                imgClassName="listPageImg" />
        );
    }
}

export default ListPageCode;
