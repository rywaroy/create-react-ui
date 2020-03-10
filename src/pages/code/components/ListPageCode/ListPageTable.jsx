import React, { Component } from 'react';
import CreateTable from '@/components/CreateTable';
import styles from './index.less';

class ListPageTable extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <div className={styles.tableBox}>
                <CreateTable isEditVariable={false} />
            </div>
        );
    }
}

export default ListPageTable;
