const displayFiles = require('../file/display-files');

module.exports = {
    createSuccessMsg(socket) {
        socket.emit('msg', {
            status: 200,
            msg: '创建成功',
        });
    },
    createFailMsg(socket, err) {
        socket.emit('msg', {
            status: 0,
            msg: err.message ? err.message : err,
        });
    },

    /**
     * 更新文件
     * @param {Object} socket - socket
     */
    updateFiles(socket) {
        const { filesArray, foldersArray } = displayFiles(process.cwd());
        socket.emit('set-files', filesArray);
        socket.emit('set-folders', foldersArray);
    }
};