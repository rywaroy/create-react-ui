import path from 'path';
import fs from 'fs-extra';
import codeFormat from '../../../utils/codeFormat';
import { IMockDataParams } from '../../../types/mockData';

export default function createMockFile(options: IMockDataParams) {
    const { path: basePath, fileName, method, baseUrl, url, mockObject } = options;
    const p = path.join(process.cwd(), basePath, fileName);
    const code = `import Mock from 'mock';
            export default {
                '${method} ${baseUrl}${url}': Mock.mock(${JSON.stringify(mockObject)}),
            }
            `;
    fs.outputFileSync(p, codeFormat(code, 2));
}
