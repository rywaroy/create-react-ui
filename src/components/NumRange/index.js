import React from 'react';
import { Input, InputNumber } from 'antd';
import styles from './index.less';

const InputGroup = Input.Group;

export default class NumRange extends React.Component {
    constructor(props){
        super(props);
        const { value = {} } = props;
        this.state = {
            minNum: value[0],
            maxNum: value[1]
        };
    }

    onMinChange=(value) => {
    	const { maxNum } = this.state;
    	if (maxNum && value > maxNum) value = 0;
    	this.setState({ minNum: value });

    	const { onChange, form } = this.props;
    	let params = [value, maxNum];
    	form && form.setFieldsValue({ [this.props['data-__field']['name']]: params });
    	onChange && onChange(params);
    }

    onMaxChange=(value) => {
    	const { minNum } = this.state;
    	if (minNum && value < minNum) value = minNum;
    	this.setState({ maxNum: value });

    	const { onChange, form } = this.props;
    	let params = [minNum, value];
    	form && form.setFieldsValue({ [this.props['data-__field']['name']]: params });
    	onChange && onChange(params);
    }

    componentWillReceiveProps(nextProps){
    	if ('value' in nextProps && nextProps.value !== this.props.value){
    		let value = nextProps.value || [];
    		this.setState({
    			minNum: value[0],
    			maxNum: value[1]
    		});
    	}
    }

    render() {
    	const { minNum, maxNum } = this.state;
    	const { precision = 0 } = this.props;
    	return (
    		<div className={styles.numRangeWrapper}>
    			<InputGroup compact className={styles.row}>
    				<InputNumber max={10000000000} value={minNum} onChange={this.onMinChange} min={0} precision={precision}/>
    				<Input
    					style={{ width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }}
    					placeholder="~"
    					disabled
    				/>
    				<InputNumber max={10000000000} min={0} value={maxNum} onChange={this.onMaxChange} precision={precision} style={{ borderLeft: 0 }} />
    			</InputGroup>
    		</div>
    	);
    }
}
