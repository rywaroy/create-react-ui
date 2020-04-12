

module.exports = function document(socket) {
    socket.on('create-document', ({ entry, output }) => {
        console.log(entry, output);
    });
};
