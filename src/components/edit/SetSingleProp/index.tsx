import React from 'react';
import { Input, InputNumber, Switch, Icon, Tooltip } from 'antd';
import singlePropTipMap from '@/utils/singlePropTipMap';

interface IProps {
    propName: string;
    propType: 'string' | 'number' | 'boolean';
    tips: string;
    onChange: (values: any) => void;
}

const SetSingleProp: React.FC<IProps> = (props) => {
    const { propName, propType } = props;
    const tips = singlePropTipMap[propName];
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
            <div className="editTitle">
                {propName}
                {
                    tips && <Tooltip title={tips}><Icon type="question-circle" style={{ marginLeft: '6px' }} /></Tooltip>
                }
            </div>
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
