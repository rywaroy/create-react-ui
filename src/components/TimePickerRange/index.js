import React from 'react';
import { TimePicker } from 'antd';
import styles from './index.less';
import moment from 'moment';

export default class NumRange extends React.Component {

    state = {
    	beginTime: this.props.value ? this.props.value[0] : '', // 开始时间
    	endTime: this.props.value ? this.props.value[1] : '', // 结束时间
    };

    // 开始时间改变
    _onStartTimeChange = (time, timeString) => {
    	const { endTime } = this.state;
    	this.setState({ beginTime: timeString });
    	const { onChange } = this.props;
    	let params = [timeString, endTime];
    	onChange && onChange(params);
    };

    // 结束时间改变
    _onEndTimeChange = (time, timeString) => {
    	const { beginTime } = this.state;
    	this.setState({ endTime: timeString });
    	const { onChange } = this.props;
    	let params = [beginTime, timeString];
    	onChange && onChange(params);
    };

    componentWillReceiveProps(nextProps) {
    	if ('value' in nextProps && nextProps.value !== this.props.value) {
    		let value = nextProps.value || [];
    		this.setState({
    			beginTime: value[0],
    			endTime: value[1],
    		});
    	}
    }

    render() {
    	const { beginTime, endTime } = this.state;
    	const { format = 'HH:mm' } = this.props;
    	return (
    		<div className={styles.TimePickerRangeWrap}>
    			<TimePicker
    				onChange={this._onStartTimeChange}
    				value={beginTime ? moment(beginTime, format) : undefined}
    				defaultOpenValue={moment('00:00:00', format)}
    				format={format}
    			/>
    			<span style={{ margin: 3 }}>~</span>
    			<TimePicker
    				onChange={this._onEndTimeChange}
    				value={endTime ? moment(endTime, format) : undefined}
    				defaultOpenValue={moment('00:00:00', format)}
    				format={format}
    			/>
    		</div>
    	);
    }
}
