import React, { useState } from 'react';
import { Input, Button } from 'antd';

interface IProps {
    propName: string;
    onChange: (values: any) => void;
}

const SetArray: React.FC<IProps> = (props) => {
    const { propName } = props;
    const [list, setList] = useState<string[]>(props[propName] || []);

    const deleteItem = (index: number) => {
        const l = [...list];
        l.splice(index, 1);
        setList(l);
    };

    const addList = () => {
        const l = [...list];
        l.push('');
        setList(l);
    };

    const changeText = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const l = [...list];
        l[index] = e.target.value;
        setList(l);
    };

    const submit = () => {
        const l = list.filter(item => item);
        props.onChange({ [propName]: l });
    };

    return (
        <div>
            <div className="editTop">
                <div className="editTitle">列表</div>
                <Button type="primary" icon="plus" size="small" onClick={() => addList()} />
            </div>
            {
                list.map((item, index) => (
                    <div key={index} className="editItem">
                        <Input value={item} style={{ width: '150px', marginRight: '10px' }} onChange={e => changeText(e, index)} />
                        <Button type="primary" icon="minus" size="small" onClick={() => deleteItem(index)} />
                    </div>
                ))
            }
            <Button type="primary" size="small" onClick={() => submit()}>提交</Button>
        </div>
    );
};

export default SetArray;
