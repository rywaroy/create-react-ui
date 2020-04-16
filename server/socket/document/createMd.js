module.exports = function createMd(fileObj) {
    let { name } = fileObj;
    if (fileObj.main) {
        const notes = getNote(fileObj.main);
        if (notes.title) {
            name = notes.title.value;
        }
    }
    const md = createMdString(fileObj, name);
    console.log(md);
};

/**
 * 创建md字符串
 * @param {Object} notes - 文档对象
 * @param {String} name - 文件名
 */
function createMdString(notes, name) {
    let md = `# ${name} \n\n`;

    if (notes.main && notes.main.length > 0) {
        md += createNote(getNote(notes.main));
    }

    if (notes.props && notes.props.length > 0) {
        md += createProps(notes.props);
    }

    return md;
}

/**
 * 获取注释对象
 * @param {Array} note
 */
function getNote(note) {
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
function createNote(note) {
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

function createProps(props) {
    let md = '';
    md += '## props \n\n';
    md += `| 属性 | 类型 | 默认值 | 是否必填 | 说明
| ---- | ---- | ---- | ---- | ---- | \n`;
    props.forEach(item => {
        md += `| ${item.name} | ${item.type} | ${item.defaultProps ? item.defaultProps : ''} | ${item.isRequired} | ${item.value ? getNote(item.value).txt.value : ''} | \n`;
    });
    md += '\n';
    return md;
}
