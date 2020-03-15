import React, { Component } from 'react';
import { Button } from 'antd';

class ListPagePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Button type="primary">添加弹窗</Button>
            </div>
        );
    }
}

export default ListPagePopup;
