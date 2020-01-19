const createDefaultTemplate = require('./create-default-template');
const createUmiTemplate = require('./create-umi-template');
const createCoustomTemplate = require('./create-custom-template');
const displayFiles = require('../file/display-files');
const { createSuccessMsg, createFailMsg } = require('../common');

module.exports = function template(socket) {

    // 创建默认模板
    socket.on('create-default-template', async data => {
        try {
            await createDefaultTemplate(data);
            createSuccessMsg(socket);
            updateFiles(socket);
        } catch (err) {
            createFailMsg(socket, err);
        }
    });

    // 创建umi模板
    socket.on('create-umi-template', async data => {
        try {
            await createUmiTemplate(data);
            createSuccessMsg(socket);
            updateFiles(socket);
        } catch (err) {
            createFailMsg(socket, err);
        }
    });

    // 创建自定义模板
    socket.on('create-custom-template', async data => {
        try {
            await createCoustomTemplate(data);
            createSuccessMsg();
            updateFiles(socket);
        } catch (err) {
            createFailMsg(socket, err);
        }
    });
};

/**
 * 更新文件
 * @param {Object} socket - socket
 */
function updateFiles(socket) {
    const { filesArray, foldersArray } = displayFiles(process.cwd());
    socket.emit('set-files', filesArray);
    socket.emit('set-folders', foldersArray);
}