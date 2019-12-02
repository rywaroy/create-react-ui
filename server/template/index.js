const createDefaultTemplate = require('./create-default-template');

module.exports = function template(socket) {

    // 创建默认模板
    socket.on('create-default-template', async data => {
        try {
            await createDefaultTemplate(data);
            socket.emit('msg', {
                state: 1,
                msg: '创建成功',
            });
        } catch (e) {
            socket.emit('msg', {
                state: 0,
                msg: e.message,
            });
        }
    });
};