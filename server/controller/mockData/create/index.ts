import path from 'path';
import fs from 'fs-extra';
import { parse } from '@babel/parser';
import traverse, { Visitor } from '@babel/traverse';
import generate from '@babel/generator';
import codeFormat from '../../../utils/codeFormat';
import IContext from '../../../types/context';
import { IMockDataParams } from '../../../types/mockData';
import createMockFile from './createMockFile';
import appendMock from './appendMock';

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
        const p = '';
        if (fileName) {
            createMockFile({
                url,
                baseUrl,
                method,
                path: basePath,
                fileName,
                serverName,
                serverPath,
                mockObject,
            });
        } else {
            appendMock({
                url,
                baseUrl,
                method,
                path: basePath,
                serverName,
                serverPath,
                mockObject,
            });
        }

        ctx.success(200, '创建成功', null);
    } catch (err) {
        ctx.error(0, '系统错误', err);
    }
}
