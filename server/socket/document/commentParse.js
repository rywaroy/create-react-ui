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
    return line;
}
