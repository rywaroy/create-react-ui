import { IColumn } from '../types/code';

export default function tableCodeTemplate(columns: IColumn[], variable: string): string {
    for (const item of columns) {
        item.title = item.titleText;
        delete item.titleText;
        if (item.opts && item.opts.length > 0) {
        // @ts-ignore
            item.render = `() => (<>${item.opts
                .map(item => (item.link
                    ? `<a href="/" target="_blank" className="mr10">${item.text}</a>`
                    : `<span className="opt-link"${item.linkName ? ` onClick={_self.${item.linkName}ModalOpen}` : ''}>${item.text}</span>`))
                .join('')}</>)`;
            delete item.opts;
        }
    }
    const str = `${JSON.stringify(columns)}`;
    let s = str
        .replace(/"(\(\).*\))"/g, (a, b) => b)
        .replace(/\\"(opt-link|mr10|_blank|\/)\\"/g, (a, b) => `"${b}"`);
    s = `export function ${variable}(_self) { return ${s}; }`;
    return s;
}
