import path from 'path';
import fs from 'fs-extra';
import IContext from '../../types/context';
import { mockDataParams } from '../../types/mockData';

export default async function createMock(ctx: IContext) {
    const {
        url,
        baseUrl,
        method,
        path: basePath,
        fileName,
        serverName,
        serverPath,
        mockObject,
        // @ts-ignore for travis
    }: mockDataParams = ctx.request.body;

    try {
        let p = '';
        if (fileName) {
            p = path.join(process.cwd(), basePath, fileName);
            const code = `import Mock from 'mock';

            export default {
                '${method} ${baseUrl}${url}': Mock.mock(${JSON.stringify(mockObject)}),
            }
            `;
            fs.outputFileSync(p, code);
        }

        ctx.success(200, '创建成功', null);
    } catch (err) {
        ctx.error(0, '系统错误', err);
    }
}
