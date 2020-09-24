import React from 'react';
import { AutoComplete, Button } from 'antd';
import { styleMap } from './map';
import styles from './index.less';

const styleNames = Object.keys(styleMap);

interface IStyle {
    name: string;
    value: string;
}

interface IProps {
    style: any;
    onChange: (values: any) => void;
}

const SetStyle: React.FC<IProps> = (props) => {
    const { style = {} } = props;
    const styleList = [];
    Object.keys(style).forEach(s => {
        styleList.push({
            name: s,
            value: style[s],
        });
    });
    const [list, setList] = React.useState<IStyle[]>(styleList);

    /**
     * 修改样式名
     */
    const changeStyleName = (value: string, index: number) => {
        const l = [...list];
        l[index].name = value;
        l[index].value = '';
        setList(l);
    };

    /**
     * 修改样式内容
     */
    const changeStyleValue = (value: string, index: number) => {
        const l = [...list];
        l[index].value = value;
        setList(l);
    };

    /**
     * 添加样式
     */
    const addStyle = () => {
        const l = [...list];
        l.push({
            name: '',
            value: '',
        });
        setList(l);
    };

    /**
     * 删除样式
     */
    const deleteStyle = (index: number) => {
        const l = [...list];
        l.splice(index, 1);
        setList(l);
    };

    /**
     * 提交
     */
    const submit = () => {
        const value = {};
        list.forEach(item => {
            if (item.name && item.value) {
                value[item.name] = item.value;
            }
        });
        props.onChange({ style: value });
    };

    return (
        <div>
            <div className={styles.styleTop}>
                <div className={styles.styleTitle}>样式</div>
                <Button type="primary" icon="plus" size="small" onClick={() => addStyle()} />
            </div>
            {
                list.map((style, index) => (
                    <div key={index} className={styles.styleItem}>
                        <AutoComplete
                            style={{ width: '150px', marginRight: '10px' }}
                            dataSource={styleNames}
                            value={style.name}
                            onChange={(value: string) => changeStyleName(value, index)} />
                        <AutoComplete
                            style={{ width: '80px', marginRight: '10px' }}
                            dataSource={styleMap[style.name]}
                            value={style.value}
                            onChange={(value: string) => changeStyleValue(value, index)} />
                        <Button type="primary" icon="minus" size="small" onClick={() => deleteStyle(index)} />
                    </div>
                ))
            }
            <Button type="primary" size="small" onClick={() => submit()}>提交</Button>
        </div>
    );
};

export default SetStyle;
