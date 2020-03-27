const execa = require('execa');

module.exports = function publish(socket) {
    socket.on('build', async () => {
        socket.emit('term', '开始构建\n');
        socket.emit('term', 'npm run build\n');
        socket.emit('build-start');
        await execa.command('npm run build');
        socket.emit('term', '构建完成\n');
    });
};
