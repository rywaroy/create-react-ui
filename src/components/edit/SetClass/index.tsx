import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getClassList } from '@/services/configlist';
import { IClassItem } from '@/types/configlist';

interface IProps {
    className: string;
    mid: number;
    onChange: (values: any) => void;
}

const SetClass: React.FC<IProps> = (props) => {
    const { className = '', mid } = props;

    const [classList, setClassList] = useState<IClassItem[]>([]);

    const classNameChange = (value: string) => {
        if (value) {
            props.onChange({ className: value });
        }
    };

    useEffect(() => {
        getClassList()
            .then(res => {
                setClassList(res.data.data);
            });
    }, [mid]);

    return (
        <div>
            <div className="editTitle">类名</div>
            <Select
                value={className}
                style={{ width: '200px' }}
                onChange={(value: string) => classNameChange(value)}
            >
                {
                    classList.map(item => (
                        <Select.Option value={item.name} key={item.id}>{item.name}</Select.Option>
                    ))
                }
            </Select>
        </div>
    );
};

export default SetClass;
