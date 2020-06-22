import glob from 'glob';

export default function getTargetFile(path: string) {
    const files = glob.sync('**/*.js*(x)', {
        cwd: path,
    });
    return files;
}
