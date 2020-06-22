import path from 'path';
import fs from 'fs';
import IContext from '../../types/context';

interface IData {
    title: string;
    key: number;
    value: string;
}

export default async function template(ctx: IContext) {
    const base = path.join(process.cwd(), '.crui', 'template');
    if (fs.existsSync(base)) {
        const file = fs.readdirSync(base);
        if (file.length === 0) {
            ctx.error(0, '该目录下没有文件');
        } else {
            const data: IData[] = [];
            file.forEach((item, index) => {
                if (/^.+\..+$/.test(item)) { // 判断是文件
                    data.push({
                        title: item,
                        key: index + 1,
                        value: item,
                    });
                }
            });
            ctx.success(200, '', data);
        }
    } else {
        ctx.error(0, '找不到/.crui/template文件目录');
    }
}
