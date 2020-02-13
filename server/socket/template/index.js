const createUmiTemplate = require('./create-umi-template');
const createCoustomTemplate = require('./create-custom-template');
const { createSuccessMsg, createFailMsg, updateFiles } = require('../common');

module.exports = function template(socket) {

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