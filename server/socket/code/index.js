const createTableCode = require('./table-code');
const createFormCode = require('./form-code');
const { createSuccessMsg, createFailMsg } = require('../common');

module.exports = function code(socket) {
    // 创建table组件配置对象
    socket.on('create-table-code', async data => {
        try {
            await createTableCode(data);
            createSuccessMsg(socket);
        } catch (err) {
            createFailMsg(socket, err);
        }
    });

    // 创建form组件配置对象
    socket.on('create-form-code', async data => {
        try {
            await createFormCode(data);
            createSuccessMsg(socket);
        } catch (err) {
            createFailMsg(socket, err);
        }
    });
};