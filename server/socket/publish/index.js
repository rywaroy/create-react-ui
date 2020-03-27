const execa = require('execa');

module.exports = function publish(socket) {
    socket.on('build', () => {
        const { stdout } = execa.commandSync('echo 1');
        socket.emit('term', stdout);
    });
};
