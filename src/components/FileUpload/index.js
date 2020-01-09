import React, { Component } from 'react';
import { Upload, Button, Icon, message } from 'antd';
import uuid from 'uuid';
import { stitchUrlParam, queryString } from 'lib/utils';
import PropTypes from 'prop-types';
import { uploadFileUrl } from 'services/global';

class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
        };
    }

    handleChange = info => {
        if (this.props.max && (info.file.size / 1024 / 1024) > this.props.max) {
            return;
        }
        if (info.fileList.length > 0) {
            const file = info.fileList.pop();
            this.setState({ fileList: [file] });
            if (file.status === 'done') {
                this.props.onChange && this.props.onChange(file.response.data);
            }
        } else {
            this.setState({ fileList: [] });
            this.props.onChange && this.props.onChange('');
        }
    };

    beforeUpload = file => {
        if (this.props.max && (file.size / 1024 / 1024) > this.props.max) {
            message.error('上传文件大小超过限制');
            return false;
        }
        return true;
    }

    render() {
        let { action, accept, addonAfter } = this.props;

    	/* 根据后端要求，添加随机数*/
    	const randomParams = {
    		uuid: uuid.v4(),
    		timestamp: new Date().getTime(),
    	};
    	action = stitchUrlParam(action, queryString(randomParams));
        return (
            <Upload
                action={action}
                accept={accept}
                onChange={this.handleChange}
                fileList={this.state.fileList}
                beforeUpload={this.beforeUpload}>
                <Button>
                    <Icon type="upload" /> 点击上传
                </Button>
                {
                    addonAfter && <span style={{ marginLeft: '10px' }}>{addonAfter}</span>
                }
            </Upload>
        );
    }
}

FileUpload.propTypes = {
    action: PropTypes.string,
    accept: PropTypes.string, // 接收上传文件的格式，默认.jpg,.png
    onChange: PropTypes.func, // 值变更的change钩子
    addonAfter: PropTypes.string, // 后缀文字
    max: PropTypes.number, // 上传限制大小单位M
};

FileUpload.defaultProps = {
    action: uploadFileUrl,
    accept: '.doc,.docx',
};

export default FileUpload;