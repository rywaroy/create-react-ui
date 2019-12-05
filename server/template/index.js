const createDefaultTemplate = require('./create-default-template');
const createUmiTemplate = require('./create-umi-template');
const displayFiles = require('../file/display-files');

module.exports = function template(socket) {

    // 创建默认模板
    socket.on('create-default-template', async data => {
        try {
            await createDefaultTemplate(data);
            socket.emit('msg', {
                state: 1,
                msg: '创建成功',
            });
            updateFiles(socket);
        } catch (err) {
            socket.emit('msg', {
                state: 0,
                msg: err,
            });
        }
    });

    // 创建umi模板
    socket.on('create-umi-template', async data => {
        try {
            await createUmiTemplate(data);
            socket.emit('msg', {
                state: 1,
                msg: '创建成功',
            });
            updateFiles(socket);
        } catch (err) {
            socket.emit('msg', {
                state: 0,
                msg: err,
            });
        }
    });
};

function updateFiles(socket) {
    const { filesArray, foldersArray } = displayFiles(process.cwd());
    socket.emit('set-files', filesArray);
    socket.emit('set-folders', foldersArray);
}