const defaultController = require('./default');
const umi = require('./umi');
const custom = require('./custom');

module.exports = {
    default: defaultController,
    umi,
    custom,
};
