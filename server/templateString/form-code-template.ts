import { ISetFormValues } from '../types/code';

export default function formCodeTemplate(options: ISetFormValues[], name: string, labelCol: number, wrapperCol: number): string {
    let isVar = false; // 是否是变量layout
    const array = options.map(item => {
        if (item.formItemLayoutText) {
            item.formItemLayout = 'formItemLayout';
            isVar = true;
            delete item.formItemLayoutText;
        }
        return item;
    });
    let s = JSON.stringify(array);
    let formItemLayoutCode = '';
    if (isVar) {
        formItemLayoutCode = `const formItemLayout = {labelCol:{span:${labelCol}}, wrapperCol:{span:${wrapperCol}}};`;
    }
    s = `export function ${name}(_self) {${formItemLayoutCode} return ${s}; }`;
    s = s.replace(/"(formItemLayout)"/g, (a, b) => b);
    return s;
}
