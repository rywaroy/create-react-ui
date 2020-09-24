import React from 'react';
import { Input, InputNumber, Switch } from 'antd';

interface IProps {
    propName: string;
    propType: 'string' | 'number' | 'boolean';
    onChange: (values: any) => void;
}

const SetSingleProp: React.FC<IProps> = (props) => {
    const { propName, propType } = props;
    const onChangeStringValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange({
            [propName]: e.target.value,
        });
    };
    const onChangeNumberValue = (number: number) => {
        props.onChange({
            [propName]: number,
        });
    };
    const onChangeBooleanValue = (value: boolean) => {
        props.onChange({
            [propName]: value,
        });
    };
    return (
        <div>
            <div className="editTitle">{propName}</div>
            {
                propType === 'string' && <Input value={props[propName]} onChange={e => onChangeStringValue(e)} />
            }
            {
                propType === 'number' && <InputNumber value={props[propName]} onChange={number => onChangeNumberValue(number)} />
            }
            {
                propType === 'boolean' && <Switch checked={props[propName]} onChange={value => onChangeBooleanValue(value)} />
            }
        </div>
    );
};

export default SetSingleProp;
