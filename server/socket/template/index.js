const createDefaultTemplate = require('./create-default-template');
const createUmiTemplate = require('./create-umi-template');
const createCoustomTemplate = require('./create-custom-template');
const displayFiles = require('../file/display-files');

module.exports = function template(socket) {

    // 成功创建文件
    function createSuccess() {
        socket.emit('msg', {
            status: 200,
            msg: '创建成功',
        });
    }

    // 创建失败
    function createFail(err) {
        socket.emit('msg', {
            status: 0,
            msg: err.message ? err.message : err,
        });
    }

    // 创建默认模板
    socket.on('create-default-template', async data => {
        try {
            await createDefaultTemplate(data);
            createSuccess();
            updateFiles(socket);
        } catch (err) {
            createFail(err);
        }
    });

    // 创建umi模板
    socket.on('create-umi-template', async data => {
        try {
            await createUmiTemplate(data);
            createSuccess();
            updateFiles(socket);
        } catch (err) {
            createFail(err);
        }
    });

    // 创建自定义模板
    socket.on('create-custom-template', async data => {
        try {
            await createCoustomTemplate(data);
            createSuccess();
            updateFiles(socket);
        } catch (err) {
            createFail(err);
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