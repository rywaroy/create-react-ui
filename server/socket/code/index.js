const createTableCode = require('./table-code');
const createFormCode = require('./form-code');

module.exports = function code(socket) {
    // 创建table组件配置对象
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

    // 创建form组件配置对象
    socket.on('create-form-code', async data => {
        try {
            await createFormCode(data);
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