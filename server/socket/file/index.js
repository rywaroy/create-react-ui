const displayFiles = require('./display-files');

module.exports = function file(socket) {
    socket.on('get-files', () => {
        const { filesArray, foldersArray } = displayFiles(process.cwd());
        socket.emit('set-files', filesArray);
        socket.emit('set-folders', foldersArray);
    });
};