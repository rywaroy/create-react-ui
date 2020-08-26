import React, { useState } from 'react';
import { InputNumber } from 'antd';
import { useUpdateEffect } from 'ahooks';

interface ICol {
    span: number;
}

interface IProps {
    labelCol: ICol;
    wrapperCol: ICol;
    onChange: (values: any) => void;
}

const SetLayout: React.FC<IProps> = (props) => {
    const { labelCol, wrapperCol } = props;
    const [label, setLabel] = useState<number>(labelCol?.span || 0);
    const [wrapper, setWrapper] = useState<number>(wrapperCol?.span || 0);

    useUpdateEffect(() => {
        props.onChange({
            labelCol: { span: label },
        });
    }, [label]);

    useUpdateEffect(() => {
        props.onChange({
            wrapperCol: { span: wrapper },
        });
    }, [wrapper]);

    return (
        <div>
            <div className="editTitle">layout</div>
            labelCol: <InputNumber value={label} style={{ width: '80px' }} onChange={num => setLabel(num)} step={1} /> &nbsp;&nbsp;
            wrapperCol: <InputNumber value={wrapper} style={{ width: '80px' }} onChange={num => setWrapper(num)} step={1} />
        </div>
    );
};

export default SetLayout;
