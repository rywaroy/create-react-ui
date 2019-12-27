const createTableCode = require('./table-code');

module.exports = function code(socket) {
    // 创建默认模板
    socket.on('create-table-code', async data => {
        try {
            await createTableCode(data);
            socket.emit('msg', {
                status: 200,
                msg: '创建成功',
            });
        } catch (err) {
            socket.emit('msg', {
                status: 0,
                msg: err.message ? err.message : err,
            });
        }
    });
};