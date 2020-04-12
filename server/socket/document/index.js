const path = require('path');
const fs = require('fs');
const getTargetFile = require('./getTargetFile');
const astParse = require('./astParse');

module.exports = function document(socket) {
    socket.on('create-document', ({ entry }) => {
        const entryBase = path.join(process.cwd(), entry);
        const stat = fs.statSync(entryBase);
        let files = [];
        if (stat.isDirectory()) {
            files = getTargetFile(entryBase);
        }
        files.forEach(item => {
            astParse(item);
        });
    });
};
