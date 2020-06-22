import prettier from 'prettier';

export default function codeFormat(str: string) {
    return prettier.format(str, { parser: 'babel', tabWidth: 4 });
}
