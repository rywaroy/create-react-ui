import React from 'react';
import { Radio } from 'antd';

interface IProps {
    project: string;
    onChange: (values: any) => void;
}

const SetProject: React.FC<IProps> = (props) => {
    const { project, onChange } = props;

    return (
        <div>
            <div className="editTop">
                <div className="editTitle">项目</div>
            </div>
            <div>
                <Radio.Group value={project} onChange={e => onChange({ project: e.target.value })}>
                    <Radio value="陆运通后台">陆运通后台</Radio>
                    <Radio value="油涟后台">油涟后台</Radio>
                </Radio.Group>
            </div>
        </div>
    );
};

export default SetProject;
