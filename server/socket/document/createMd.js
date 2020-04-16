module.exports = function createMd(fileObj) {
    let { name } = fileObj;
    if (fileObj.main) {
        const notes = getNote(fileObj.main);
        if (notes.title) {
            name = notes.title.value;
        }
    }
    console.log(name);
};

/**
 * 获取注释对象
 * @param {Array} note
 */
function getNote(note) {
    const noteObj = {};
    note.forEach(item => {
        noteObj[item.name] = item;
    });
    return noteObj;
}
