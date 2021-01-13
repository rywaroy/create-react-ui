import path from 'path';
import fs from 'fs-extra';
import { parse } from '@babel/parser';
import traverse, { Visitor } from '@babel/traverse';
import generate from '@babel/generator';
import codeFormat from '../../../utils/codeFormat';
import { IMockDataParams } from '../../../types/mockData';

export default function appendMock(options: IMockDataParams) {
    const { path: basePath, method, baseUrl, url, mockObject } = options;
    const p = path.join(process.cwd(), basePath);
    const ast = parse(fs.readFileSync(p, 'utf-8'), {
        sourceType: 'module',
    });
    const mockObjectAst = getMockObjectAst(
        `'${method} ${baseUrl}${url}': Mock.mock(${JSON.stringify(mockObject)})`,
    );
    // @ts-ignore
    traverse(ast, createExportVisitor(mockObjectAst));
    // @ts-ignore
    const { code } = generate(ast);
    fs.outputFileSync(p, codeFormat(code, 2));
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
