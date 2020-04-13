const rules = {
    '@version': {
        name: 'version',
        cn: '版本号',
        simple: true,
    },
    '@author': {
        name: 'author',
        cn: '作者',
        simple: true,
    },
    '@param': {
        name: 'param',
        cn: '参数',
        simple: false,
    },
    '@returns': {
        name: 'returns',
        cn: '返回',
        simple: false,
    },
    '@intro': {
        name: 'intro',
        cn: '介绍',
        simple: true,
    },
    '@url': {
        name: 'url',
        cn: '地址',
        simple: true,
    },
    '@image': {
        name: 'image',
        cn: '图片',
        simple: true,
    },
    '@txt': {
        name: 'txt',
        cn: '文本',
        simple: true,
    },
    '@title': {
        name: 'title',
        cn: '标题',
        simple: true,
    },
};

/**
 * 过滤注释，返回注释解析对象
 * @param {Array} comments - 注释数组
 * @returns {Object}
 */
module.exports = function commentParse(comments) {
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
};

/**
 * 过滤块级注释，返回单行内容
 * @param {String} str - 注释字符串
 * @returns {Array}
 */
function filterCommentBlock(comment) {
    const commentArray = [];
    comment.value.split('\n').forEach(item => {
    // 去除星号、首尾空格 ' * abcd   ' -> 'abcd'
        const str = item.replace(/(^\s*\*\s*)|(\s*$)/, '');

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
function filterCommentLine(line) {
    // 验证是否包含文档规则@，否则直接返回字符串
    if (/@[a-z]+/.test(line)) {
        let flag = false;
        let obj;
        Object.keys(rules).forEach(key => {
            // 遍历规则，查找
            if (line.indexOf(key) > -1) {
                flag = true;
                if (rules[key].simple) {
                    obj = {
                        name: key,
                        value: line.replace(new RegExp(`\\s*${key}\\s+`), ''),
                        ...rules[key],
                    };
                } else {
                    // 解析复杂规则如 @param @returns
                    obj = filterRules(key, line);
                }
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

function filterRules() {

}
