import SetStyle from './SetStyle';
import SetClass from './SetClass';

export { SetStyle, SetClass };

const editComponentsMap: {
    [props: string]: any;
} = {
    style: SetStyle,
    className: SetClass,
};

export default editComponentsMap;
