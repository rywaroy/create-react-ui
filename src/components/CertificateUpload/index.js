import React from 'react';
import { Upload, Modal, message } from 'antd';
import uuid from 'uuid';
import { stitchUrlParam, queryString } from '../../../lib/utils';
import styles from './index.less';
import { uploadImgUrl } from '../../../services/global';
import PropTypes from 'prop-types';
import { TfIcon } from '../../../components';

export default class CertificateUpload extends React.Component {
    state = {
    	previewVisible: false,
    	previewImage: '',
    	fileList: [],
    };

    // 关闭预览图片
    handleCancel = () => this.setState({ previewVisible: false });

    // 预览
    handlePreview = file => {
    	this.setState({
    		previewImage: file.url || file.thumbUrl,
    		previewVisible: true,
    	});
    };

    // 上传成功
    handleSuccess = response => {
    	if (response.code === 0) {
    		this.props.onChange && this.props.onChange(response.data);
    	} else {
    		message.error(response.msg);
    	}
    };

    // 移除
    handleRemove = file => {
    	const { value } = this.props;
    	let arr = [];
    	if (value) arr = value.split(',');
    	const res = arr.filter(item => item !== file.url);

    	this.props.onChange && this.props.onChange(res.join(','));
    };

    // 上传文件之前的钩子
    handleBeforeUpload = file => {
    	const isLegal = file.type === 'image/jpeg' || file.type === 'image/png';
    	if (!isLegal) {
    		message.error('图片文件必须是jpg、png！');
    	}
    	const isLt3M = file.size / 1024 / 1024 < 3;
    	if (!isLt3M) {
    		message.error('图片文件必须小于3MB!');
    	}
    	return isLegal && isLt3M;
    };

    // 接收值的改变
    componentWillReceiveProps(nextProps) {
    	if ('value' in nextProps && nextProps.value !== this.props.value)
    		this.transferValueToArray(nextProps.value);
    }

    // 转化外部的值为数组
    transferValueToArray(value) {
    	// 转换外界的对象为组件对应的数组对象
    	let res = [];
    	if (value) {
    		let arr = value.split(','); // 接受多张图片数据
    		for (let i in arr) {
    			res.push({
    				uid: i,
    				url: arr[i],
    				name: `${i }.png`,
    				status: 'done',
    			});
    		}
    	}
    	this.setState({ fileList: res });
    }

    render() {
    	const { previewVisible, previewImage, fileList } = this.state;
    	const { disabled, size, hideUploadButton = false } = this.props;
    	const uploadButton = (
    		<div className={styles.defaultUploadWrap}>
    			<TfIcon type="Upload1" style={{ color: '#51A1FD', fontSize: '35px' }} />
    			<div className="ant-upload-text">上传</div>
    		</div>
    	);
    	let { maxFileList, action, accept } = this.props;

    	/* 根据后端要求，添加随机数*/
    	const randomParams = {
    		uuid: uuid.v4(),
    		timestamp: new Date().getTime(),
    	};
    	action = stitchUrlParam(action, queryString(randomParams));
    	return (
    		<div className={`${styles[`tfUploadWrap-${ size}`]}`}>
    			<Upload
    				action={action}
    				accept={accept}
    				listType="picture-card"
    				fileList={fileList}
    				onPreview={this.handlePreview}
    				onChange={this.handleChange}
    				onRemove={this.handleRemove}
    				onSuccess={this.handleSuccess}
    				beforeUpload={this.handleBeforeUpload}
    				disabled={disabled}
    				showUploadList={{ showPreviewIcon: true, showRemoveIcon: !disabled }}
    			>
    				{fileList.length >= maxFileList || hideUploadButton ? null : uploadButton}
    			</Upload>
    			<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
    				<img alt="example" style={{ width: '100%' }} src={previewImage} />
    			</Modal>
    		</div>
    	);
    }

    // 初始化的赋默认值
    componentDidMount() {
    	const { value } = this.props;
    	this.transferValueToArray(value);
    }
}

// 属性校验
CertificateUpload.propTypes = {
    value: PropTypes.string, // 值
    disabled: PropTypes.bool, // 是否可以删除重新上传
    size: PropTypes.string, // 上传组件的大小，有large\small，默认large
    hideUploadButton: PropTypes.bool, // 是否隐藏上传按钮，默认否
    maxFileList: PropTypes.number, // 最多可上传几张图片，默认1张
    action: PropTypes.string, // 上传请求url地址，已有默认配置
    accept: PropTypes.string, // 接收上传文件的格式，默认.jpg,.png
    onChange: PropTypes.func, // 值变更的change钩子
};
// 默认值配置
CertificateUpload.defaultProps = {
    disabled: false,
    size: 'large',
    hideUploadButton: false,
    maxFileList: 1,
    action: uploadImgUrl,
    accept: '.jpg,.png',
};
