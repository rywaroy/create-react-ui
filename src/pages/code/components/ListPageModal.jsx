import React, { Component } from 'react';
import { Modal } from 'antd';

class ListPageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { visible, onCancel } = this.props;
        return (
            <Modal
                visible={visible}
                title="配置"
                width="1200px"
                onCancel={() => { onCancel(); }}>
                <div />
            </Modal>
        );
    }
}

export default ListPageModal;
