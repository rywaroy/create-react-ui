import React, { Component } from 'react';
import { Button } from 'antd';

class ListPageFilter extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    /**
     * 打开添加弹窗
     */
    openAdd = () => {

    }

    render() {
        return (
            <div style={{ marginTop: '20px' }}>
                <div>
                    筛选表单：
                    <Button type="primary" onClick={this.openAdd}>添加</Button>
                </div>

            </div>
        );
    }
}

export default ListPageFilter;
