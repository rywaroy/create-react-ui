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
    }
};