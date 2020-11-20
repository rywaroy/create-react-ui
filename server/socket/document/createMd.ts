import path from 'path';
import fs from 'fs';
import { IPageObject, ICommentLine } from '../../types/document';

export default function createMd(fileObj: IPageObject, output: string) {
    const { main, name, projectPath, fileName, example } = fileObj;
    let notes = '';
    if (main && main.length > 0) {
        main.forEach(item => {
            notes += createNote(item);
        });
    }

    const md = `---
name: ${name}
route: /${fileName}
---

import { Playground, Props } from 'docz';
import ${name} from '${path.relative(`/${output}`, projectPath)}';

# ${name}

${notes}

<h3>属性</h3>

<Props of={${name}} />

${example && `<h3>例子</h3>

<Playground>
${example}
</Playground>`}`;

    fs.writeFileSync(`${path.join(process.cwd(), output, `${fileName}.mdx`)}`, md);
}

function createNote(note: ICommentLine) {
    let md = '';
    switch (note.name) {
    case 'author':
        md = `${note.cn}: ${note.value}\n\n`;
        break;
    case 'url':
        md = `${note.cn}: ${note.value}\n\n`;
        break;
    default:
        md = `${note.value}\n\n`;
    }
    return md;
}
