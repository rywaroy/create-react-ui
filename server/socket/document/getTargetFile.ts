import glob from 'glob';

export default function getTargetFile(path: string) {
    const files = glob.sync('**/*.*(j|t)s*(x)', {
        cwd: path,
    });
    return files;
}
