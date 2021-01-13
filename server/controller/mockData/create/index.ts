import IContext from '../../../types/context';
import { IMockDataParams } from '../../../types/mockData';
import createMockFile from './createMockFile';
import appendMock from './appendMock';
import createServices from './createServices';

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
    }: IMockDataParams = ctx.request.body;

    try {
        if (fileName) {
            createMockFile({
                url,
                baseUrl,
                method,
                path: basePath,
                fileName,
                mockObject,
            });
        } else {
            appendMock({
                url,
                baseUrl,
                method,
                path: basePath,
                mockObject,
            });
        }

        if (serverName && serverPath) {
            createServices({
                url,
                baseUrl,
                method,
                serverName,
                serverPath,
                path: basePath,
            });
        }

        ctx.success(200, '创建成功', null);
    } catch (err) {
        ctx.error(0, '系统错误', err);
    }
}
