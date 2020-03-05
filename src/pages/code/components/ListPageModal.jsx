import React, { Component } from 'react';
import { Modal, Input } from 'antd';
import styles from '../index.less';

class ListPageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '', // 页面标题
        };
    }

    render() {
        const { visible, onCancel } = this.props;
        const { title } = this.state;
        return (
            <Modal
                visible={visible}
                title="配置"
                width="1200px"
                onCancel={() => { onCancel(); }}>
                <div className={styles.listPage}>
                    <div className={styles.title}>
                        <Input placeholder="页面标题" className={styles.titleInput} value={title} onChange={e => this.setState({ title: e.target.value })} />
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ListPageModal;
