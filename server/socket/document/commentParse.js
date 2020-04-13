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

function filterCommentBlock(comment) {
    return comment;
}

function filterCommentLine(line) {
    return line;
}
