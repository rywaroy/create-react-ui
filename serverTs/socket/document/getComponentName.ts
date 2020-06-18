import { IPageObject } from '../../types/document';

export default function getComponentName(fileObj: IPageObject) {
    let { name } = fileObj;
    if (fileObj.main) {
        fileObj.main.forEach(item => {
            if (item.name === 'title') {
                name = item.value;
            }
        });
    }
    return name;
}
