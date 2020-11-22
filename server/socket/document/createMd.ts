import path from 'path';
import { IPageObject, ICommentLine, INote, IPageProps } from '../../types/document';

export default function createMd(fileObj: IPageObject, output: string) {
    const { main, name, projectPath, example, props } = fileObj;
    let notes = '';
    if (main && main.length > 0) {
        main.forEach(item => {
            notes += createNote(item);
        });
    }

    // 相对组件路径
    const componentPath = `${path.relative(`/${output}`, projectPath)}`;

    // 后缀
    const ext = path.extname(projectPath);

    // 组件代码
    let exampleText = '';
    if (example) {
        exampleText = `
## 代码演示

\`\`\`jsx
import React from 'react';
import ${name} from '${componentPath}';
    
export default ${example.startsWith('<') ? `() => ${example}` : example};
\`\`\``;
    }

    let md = `# ${name}\n\n`;
    md += `${notes}\n\n`;
    if (exampleText) {
        md += `${exampleText}\n\n`;
    }
    if (ext === '.tsx' && (!props || props.length === 0)) {
        md += `<API src="${componentPath}"></API>\n\n`;
    }
    if (props && props.length > 0) {
        md += createProps(props);
    }

    return md;
}

function createNote(note: ICommentLine) {
    let md = '';
    switch (note.name) {
    case 'author':
        md = `${note.cn}: ${note.value}\n\n`;
        break;
    case 'url':
        md = `${note.cn}: ${note.value}\n\n`;
        break;
    default:
        md = `${note.value}\n\n`;
    }
    return md;
}

/**
 * 获取注释对象
 * @param {Array} note
 */
function getNote(note: ICommentLine[]): INote {
    const noteObj = {};
    note.forEach(item => {
        noteObj[item.name] = item;
    });
    return noteObj;
}

function createProps(props: IPageProps[]) {
    let md = '';
    md += '## API \n\n';
    md += `| 属性 | 类型 | 默认值 | 是否必填 | 说明
| ---- | ---- | ---- | ---- | ---- | \n`;
    props.forEach(item => {
        md += `| ${item.name} | ${item.type} | ${item.defaultProps ? item.defaultProps : ''} | ${item.isRequired} | ${item.value ? getNote(item.value).txt.value : ''} | \n`;
    });
    md += '\n';
    return md;
}
