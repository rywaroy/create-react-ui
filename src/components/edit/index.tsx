import SetStyle from './SetStyle';
import SetClass from './SetClass';
import SetSingleProp from './SetSingleProp';

export { SetStyle, SetClass };

const editComponentsMap: {
    [props: string]: any;
} = {
    style: SetStyle,
    className: SetClass,
    prop: SetSingleProp,
};

export default editComponentsMap;
