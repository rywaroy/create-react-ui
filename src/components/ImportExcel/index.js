import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Button, Row, Col, Icon, message } from 'antd';
import uuid from 'uuid';
import { stitchUrlParam, queryString } from '../../../lib/utils';
import styles from './index.less';

export default class ImportExcel extends React.Component {
    state = {
    	fileList: [],
    	errorData: {}, // 错误数据
    };

    beforeUpload = () => {
    	this.props.beforeUpload && this.props.beforeUpload();
    }

    // 上传变化事件
    handleChange = ({ file, fileList }) => {
    	this.props.onChange && this.props.onChange(file); // 将值更新到外部getFieldDerector

    	this.setState({ fileList });
    	if (file.status === 'done' && file.response) {
    		if (file.response.code === 0) {
    			const data = file.response.data;
    			this.setState({ errorData: data });
    			this.props.onComplete && this.props.onComplete(data);
    		} else {
    			message.error(file.response.msg);
    		}
    	}
    	if (fileList.length === 0) {
    		this.setState({ errorData: {} });
    	}
    };

    render() {
    	let {
    			action = '', // 上传地址
    			templateUrl = '', // 模块地址
    			name = '', // 上传时传递给后台的参数
    			data = {}, // 上传所需参数或返回上传参数的方法
    			successCountKey = 'successCnt', // 上传成功的数量 对应在response中的字段
    			errorCountKey = 'errorCnt', // 上传失败的数量 对应在response中的字段
    			errorListKey = 'errorList', // 上传失败时，错误原因列表对应在response中的字段
    			errorKey = 'remark', // 上传失败时，具体的错误原因在errorList中的key
    		} = this.props;
    	let { errorData, fileList } = this.state;
    	let { [errorCountKey]: errorCnt = 0, [successCountKey]: successCnt = 0, [errorListKey]: errorList = [] } = errorData;

    	const errorDetail = errorList.length > 0 && errorList.map((item, index) => {
    		return (
    			<div key={`error_${ index}`}>
    				{item[errorKey]}
    			</div>
    		);
    	});

    	/* 根据后端要求，添加随机数*/
    	const randomParams = {
    		uuid: uuid.v4(),
    		timestamp: new Date().getTime(),
    	};
    	action = stitchUrlParam(action, queryString(randomParams));

    	const uploadProps = {
    		name,
    		data,
    		action,
    		accept: '.xls,.xlsx',
    		headers: {
    			authorization: 'authorization-text',
    		},
    		onChange: this.handleChange,
    		beforeUpload: this.beforeUpload,
    	};

    	return (
    		<div className={styles.importExcelWrap}>
    			<Row>
    				<Col span={16}>
    					<Upload {...uploadProps} fileList={fileList}>
    						<Button disabled={fileList.length > 0}>
    							<Icon type="upload"/> 请选择excel导入
    						</Button>
    					</Upload>
    				</Col>
    				<Col span={8}>
    					<a href={templateUrl}>下载模板</a>
    				</Col>
    			</Row>
    			{/* 显示上传成功、失败的数量*/}
    			{!!(errorCnt || successCnt) && (
    				<div>
    					<div className={styles.statisticsWrap}>
    						<span className={styles.successWrap}>
    							{successCnt}条数据，导入成功,
    						</span>
    						<span className={styles.errorWrap}>
    							{errorCnt}条数据无效，导入失败
    						</span>
    					</div>
    				</div>
    			)}
    			{/* 显示失败的具体原因*/}
    			{errorList.length > 0 && (
    				<div className={styles.errorDetailWrap}>{errorDetail}</div>
    			)}
    		</div>
    	);
    }
}

// 组件props属性，参考ant design Upload
ImportExcel.propTypes = {
    action: PropTypes.string, // 上传地址
    templateUrl: PropTypes.string, // 模块地址
    name: PropTypes.any, // 上传时传递给后台的参数
    successCountKey: PropTypes.string, // 上传成功的数量 对应在response中的字段
    errorCountKey: PropTypes.string, // 上传失败的数量 对应在response中的字段
    errorListKey: PropTypes.string, // 上传失败时，错误原因列表对应在response中的字段
    errorKey: PropTypes.string, // 上传失败时，具体的错误原因在errorList中的key
    beforeUpload: PropTypes.func, // 上传组件beforeUpload事件
};
