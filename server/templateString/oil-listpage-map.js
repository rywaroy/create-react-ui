module.exports = function oilListpageMap(formCode, tableCode, popupForms) {
    return `
${formCode}

${tableCode}

${popupForms.map(item => item.code).join('\n\n')}
`;
};
