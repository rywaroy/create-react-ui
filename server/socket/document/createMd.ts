import path from 'path';
import fs from 'fs';
import { IPageObject, ICommentLine, INote } from '../../types/document';

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
        md += createNote(getNote(notes.main));
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

/**
 * 创建注释字符串
 * @param {Object} note
 * @returns {String}
 */
function createNote(note: INote) {
    let md = '';
    if (note.intro) {
        md += `> ${note.intro.value}\n\n`;
    }
    if (note.version) {
        md += `${note.version.cn}: ${note.version.value} \n\n`;
    }
    if (note.author) {
        md += `${note.author.cn}: ${note.author.value}\n\n`;
    }
    if (note.url) {
        md += `${note.url.cn}: ${note.url.value}\n\n`;
    }
    if (note.image) {
        md += `${note.image.cn}: ![](${note.image.value})\n\n`;
    }
    if (note.txt) {
        md += `${note.txt.value}\n\n`;
    }
    return md;
}
