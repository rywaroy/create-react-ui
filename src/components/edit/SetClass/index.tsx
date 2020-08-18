import React from 'react';
import { Select } from 'antd';

interface IProps {
    className: string;
    onChange: (values: any) => void;
}

const SetClass: React.FC<IProps> = (props) => {
    const { className = '' } = props;

    const classNameChange = (value: string) => {
        if (value) {
            props.onChange({ className: value });
        }
    };

    return (
        <div>
            <div className="editTitle">类名</div>
            <Select
                value={className}
                style={{ width: '200px' }}
                onChange={(value: string) => classNameChange(value)}
            >
                <Select.Option value="a">a</Select.Option>
                <Select.Option value="b">b</Select.Option>
                <Select.Option value="c">c</Select.Option>
            </Select>
        </div>
    );
};

export default SetClass;
