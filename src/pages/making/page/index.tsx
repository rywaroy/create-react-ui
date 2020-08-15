import React from 'react';
import { connect } from 'dva';
import { GlobalModelState } from '@/models/global';
import styles from './index.less';

interface IProps {
    global: GlobalModelState;
    dispatch: Function;
}

interface IState {

}

class Making extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // 收起菜单
        this.props.dispatch({
            type: 'global/updateState',
            payload: {
                collapsed: true,
            },
        });
    }

    render() {
        return (
            <div className={styles.pageWrap}>
                <div className={styles.material} />
                <div className={styles.pageContent} />
                <div className={styles.edit} />
            </div>
        );
    }
}

export default connect(({ global }: { global: GlobalModelState }) => ({
    global,
}))(Making);
