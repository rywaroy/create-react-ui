import path from 'path';
import fs from 'fs';
import { IPageObject, ICommentLine } from '../../types/document';

export default function createMd(fileObj: IPageObject, name: string, output: string) {
    const md = createMdString(fileObj, name);
    fs.writeFileSync(`${path.join(process.cwd(), output, `${name}.md`)}`, md);
}

/**
 * 创建md字符串
 * @param {Object} notes - 文档对象
 * @param {String} name - 文件名
 */
function createMdString(notes: IPageObject, name: string) {
    let md = `# ${name} \n\n`;

    if (notes.main && notes.main.length > 0) {
        notes.main.forEach(item => {
            md += createNote(item);
        });
    }

    return md;
}

/**
 * 创建注释字符串
 * @param {Object} note
 * @returns {String}
 */
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
