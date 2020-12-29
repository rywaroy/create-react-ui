import path from 'path';
import fs from 'fs-extra';
import codeFormat from '../../../utils/codeFormat';
import { IMockDataParams } from '../../../types/mockData';

export default function createServices(options: IMockDataParams) {
    const { method, baseUrl, url, serverName, serverPath } = options;
    let code = '';
    if (baseUrl === '/marketingScoreNode/proxy/tradeManager') {
        code = `export const ${serverName} = params => ${method === 'GET' ? 'ajaxGet' : 'ajaxPost'}({
            url: \`\${tradeManager}${url}\`,
            data: ${method === 'GET' ? 'params.data' : 'qs.stringify(params.data)'},
          });`;
    } else {
        code = `export function ${serverName}(params) {
            return ${method === 'GET' ? 'requestGet' : 'requestPost'}('${baseUrl}${url}', params);
        }`;
    }
    fs.appendFileSync(path.join(process.cwd(), serverPath), codeFormat(code, 2));
}
