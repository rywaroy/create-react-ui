import prettier from 'prettier';

export default function codeFormat(str: string, tabWidth = 4) {
    return prettier.format(str, { parser: 'babel', tabWidth });
}
