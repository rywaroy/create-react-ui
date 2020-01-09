import React from 'react';
import TfReactSite from 'tf-react-site';
import 'tf-react-site/dist/index.min.css';
import PropTypes from 'prop-types';

import isEqual from 'lodash/isEqual';

// 后端入参名配置
const fieldsNameConfig = [
    ['province', 'provinceCode'],
    ['city', 'cityCode'],
    ['region', 'regionCode'],
    ['street', 'streetCode']
];

export default class TfOilAddr extends React.Component {
    state = {
    	address: []
    }

    handleBlur= (selectedOptions = []) => {
    	if (selectedOptions.length === 0 || !selectedOptions[0].label){
    		this.handleSelect();
    	}
    }

    handleSelect = (selectedOptions = []) => {
    	const { onChange } = this.props;
    	let params;
    	let len = selectedOptions.length;
    	let address = selectedOptions.map(item => {
    			return {
    				value: item.value,
    				label: item.label
    			};
    		});

    	this.setState({ address }, () => {
    		if (len > 0) {
    			params = {};
    			// 整合出参为对象，params={province,city,...}
    			for (let i in fieldsNameConfig) {
    				let field = fieldsNameConfig[i];
    				let data = selectedOptions[i] || {};
    				if (field && data.label) {
    					params[field[0]] = data.label || '';
    					params[field[1]] = data.value || i;
    				}
    			}
    			params.districtCode = selectedOptions[len > 3 ? 2 : len - 1].value;
    		}
    		onChange && onChange(params || undefined); // 将值更新到外部getFieldDerector
    	});
    }

    componentWillReceiveProps(props) {// 接收外部传进来的值，比如手动触发改变情景
    	if ('value' in props)
    		this.transferValueToArray(props.value);
    }

    transferValueToArray(value) {// 转换外界的对象为组件对应的数组对象
    	let address = [];
    	if (value) {
    		for (let i in fieldsNameConfig) {
    			let field = fieldsNameConfig[i];
    			value[field[0]] && address.push({ label: value[field[0]] || '', value: value[field[1]] || i });
    		}
        }

    	if (!isEqual(this.state.address, address)) {
    		this.setState({ address });
    		this.site.addr.setDetail(address);
        }
    }

    render() {
    	const { placeholder, sep, level, wrapClassName, wrapStyle, readOnly } = this.props;
    	const { address } = this.state;

    	const addrProps = {
    		appId: 'oilAddr',
    		addrComponent: {
    			sep, // 分隔符
    			level, // 层级
    			placeholder, // input的placeholder
    			wrapClassName, // 外层的class
    			wrapStyle, // 外层style
    			readOnly, // 只读
    			defaultValue: address,
    			onSelect: this.handleSelect,
    			onBlur: this.handleBlur,
    		}
    	};
    	return (
            <>
                <TfReactSite {...addrProps} ref={(site) => this.site = site} />
            </>
    	);
    }

    componentDidMount() {// 初始化时的第一次默认值赋值，比如编辑打开时
    	const { value } = this.props;
    	this.transferValueToArray(value);
    }
}
// 属性校验
TfOilAddr.propTypes = {
    placeholder: PropTypes.string, // input输入框的默认文案
    sep: PropTypes.string, // 分隔符
    onChange: PropTypes.func, // 值变更的change钩子
    level: PropTypes.number, // 控制城市层级
    wrapClassName: PropTypes.string, // 样式
    wrapStyle: PropTypes.object, // 行内样式
    readOnly: PropTypes.bool, // 是否只读
};
// 默认值配置
TfOilAddr.defaultProps = {
    placeholder: '请输入',
    sep: '/',
    level: 3,
    wrapClassName: '',
    wrapStyle: {},
    readOnly: false
};