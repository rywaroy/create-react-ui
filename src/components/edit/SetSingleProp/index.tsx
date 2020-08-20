import React from 'react';
import { Input } from 'antd';

interface IProps {
    propName: string;
    propType: 'string' | 'number';
    onChange: (values: any) => void;
}

const SetSingleProp: React.FC<IProps> = (props) => {
    const { propName, propType } = props;
    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange({
            [propName]: propType === 'number' ? Number(e.target.value) : e.target.value,
        });
    };
    return (
        <div>
            <div className="editTitle">{propName}</div>
            <Input value={props[propName]} onChange={e => onChangeValue(e)} />
        </div>
    );
};

export default SetSingleProp;
