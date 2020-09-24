import React, { useState } from 'react';
import { Input, Button } from 'antd';
import styles from './index.less';

interface IProps {
    propName: string;
    onChange: (values: any) => void;
}

interface IOption {
    value: string;
    label: string;
}

const SetOptions: React.FC<IProps> = (props) => {
    const { propName } = props;
    const [options, setOptions] = useState<IOption[]>(props[propName] || []);

    const addOptions = () => {
        const list = [...options];
        list.push({
            value: '',
            label: '',
        });
        setOptions(list);
    };

    const changeLabel = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const list = [...options];
        list[index].label = e.target.value;
        setOptions(list);
    };

    const changeValue = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const list = [...options];
        list[index].value = e.target.value;
        setOptions(list);
    };

    const deleteOption = (index: number) => {
        const list = [...options];
        list.splice(index, 1);
        setOptions(list);
    };

    const submit = () => {
        const list = options.filter(option => option.label && option.value);
        props.onChange({
            [propName]: list,
        });
    };

    return (
        <div>
            <div className={styles.optionsTop}>
                <div className={styles.optionsTitle}>{propName}</div>
                <Button type="primary" icon="plus" size="small" onClick={addOptions} />
            </div>
            {
                options.map((option, index) => (
                    <div key={index} className={styles.optionsItem}>
                        <Input value={option.label} placeholder="label" style={{ width: '145px', marginRight: '10px' }} onChange={(e) => changeLabel(e, index)} />
                        <Input value={option.value} placeholder="value" style={{ width: '145px', marginRight: '10px' }} onChange={(e) => changeValue(e, index)} />
                        <Button type="primary" icon="minus" size="small" onClick={() => deleteOption(index)} />
                    </div>
                ))
            }
            <Button type="primary" size="small" onClick={submit}>提交</Button>
        </div>
    );
};

export default SetOptions;
