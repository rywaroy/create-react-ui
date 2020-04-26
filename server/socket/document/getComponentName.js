module.exports = function getComponentName(fileObj) {
    let { name } = fileObj;
    if (fileObj.main) {
        fileObj.main.forEach(item => {
            if (item.name === 'title') {
                name = item.value;
            }
        });
    }
    return name;
};
