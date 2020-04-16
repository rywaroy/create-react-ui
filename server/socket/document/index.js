const path = require('path');
const fs = require('fs');
const getTargetFile = require('./getTargetFile');
const astParse = require('./astParse');
const createMd = require('./createMd');

module.exports = function document(socket) {
    socket.on('create-document', ({ entry, output }) => {
        const entryBase = path.join(process.cwd(), entry);
        const stat = fs.statSync(entryBase);
        let files = [];
        if (stat.isDirectory()) {
            files = getTargetFile(entryBase);
        }
        files.forEach(item => {
            const fileObj = astParse(path.join(entryBase, item));
            createMd(fileObj, output);
        });
    });
};
