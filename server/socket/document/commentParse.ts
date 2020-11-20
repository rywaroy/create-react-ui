import { ICommentLine } from '../../types/document';

const rules = {
    '@author': {
        name: 'author',
        cn: '作者',
    },
    '@url': {
        name: 'url',
        cn: '地址',
    },
    '@txt': {
        name: 'txt',
        cn: '文本',
    },
    '@title': {
        name: 'title',
        cn: '标题',
    },
};

interface IComment {
    type: string;
    value: string;
}

/**
 * 过滤注释，返回注释解析对象
 * @param {Array} comments - 注释数组
 * @returns {Object}
 */
export default function commentParse(comments: IComment[]): ICommentLine[] {
    const commentArray = [];
    comments.forEach(comment => {
        if (comment.type === 'CommentBlock') {
            const cb = filterCommentBlock(comment);
            cb.forEach(line => {
                commentArray.push(filterCommentLine(line));
            });
        }
        if (comment.type === 'CommentLine') {
            commentArray.push(filterCommentLine(comment.value));
        }
    });
    return commentArray;
}

/**
 * 过滤块级注释，返回单行内容
 * @param {String} str - 注释字符串
 * @returns {Array}
 */
function filterCommentBlock(comment: IComment): string[] {
    const commentArray = [];
    comment.value.split('\n').forEach(item => {
        let str = '';
        if (item.indexOf('@') > -1) {
            // 去除星号、首尾空格 ' * abcd   ' -> 'abcd'
            str = item.replace(/(^\s*\*\s*)|(\s*$)/, '');
        } else {
            // 去除星号、尾部空格，保留星号后的空格 ' * abcd   ' -> ' abcd'
            str = item.replace(/(^\s*\*)|(\s*$)/, '');
        }
        // 过滤空字符串
        if (str) {
            commentArray.push(str);
        }
    });
    return commentArray;
}

/**
 * 过滤行级注释
 * @param {String} line - 单行注释字符串
 * @returns {Object | String}
 */
function filterCommentLine(line: string): ICommentLine {
    // 验证是否包含文档规则@，否则直接返回字符串
    if (/@[a-z]+/.test(line)) {
        let flag = false;
        let obj: ICommentLine;
        Object.keys(rules).forEach(key => {
            // 遍历规则，查找
            if (line.indexOf(key) > -1) {
                flag = true;
                obj = {
                    name: key,
                    value: line.replace(new RegExp(`\\s*${key}\\s+`), ''),
                    ...rules[key],
                };
            }
        });
        if (!flag) { // 未匹配规则，则返回字符串
            return {
                name: 'txt',
                value: line,
                cn: '文本',
            };
        }
        return obj;
    }
    return {
        name: 'txt',
        value: line,
        cn: '文本',
    };
}
