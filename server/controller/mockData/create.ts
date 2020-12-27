import path from 'path';
import fs from 'fs-extra';
import { parse } from '@babel/parser';
import traverse, { Visitor } from '@babel/traverse';
import generate from '@babel/generator';
import codeFormat from '../../utils/codeFormat';
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
            fs.outputFileSync(p, codeFormat(code, 2));
        } else {
            p = path.join(process.cwd(), basePath);
            const ast = parse(fs.readFileSync(p, 'utf-8'), {
                sourceType: 'module',
            });
            const mockObjectAst = getMockObjectAst(`'${method} ${baseUrl}${url}': Mock.mock(${JSON.stringify(mockObject)})`);
            // @ts-ignore
            traverse(ast, createExportVisitor(mockObjectAst));
            // @ts-ignore
            const { code } = generate(ast);
            fs.outputFileSync(p, codeFormat(code, 2));
        }

        ctx.success(200, '创建成功', null);
    } catch (err) {
        ctx.error(0, '系统错误', err);
    }
}

function createExportVisitor(mockObjectAst): Visitor {
    const visitor = {
        ExportDefaultDeclaration(path) {
            // 导出对象
            if (path.node.declaration.type === 'ObjectExpression') {
                path.node.declaration.properties.push(mockObjectAst);
            }
        },
    };

    return visitor;
}

function getMockObjectAst(str: string) {
    const code = `const obj = {
        ${str}
    }`;
    const ast = parse(code, {
        sourceType: 'module',
    });
    // @ts-ignore
    return ast.program.body[0].declarations[0].init.properties[0];
}
