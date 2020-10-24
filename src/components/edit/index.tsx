import SetStyle from './SetStyle';
import SetClass from './SetClass';
import SetSingleProp from './SetSingleProp';
import SetTable from './SetTable';
import SetForm from './SetForm';
import SetLayout from './SetLayout';
import SetOptions from './SetOptions';
import SetArray from './SetArray';
import SetProject from './SetProject';

export { SetStyle, SetClass };

const editComponentsMap: {
    [props: string]: any;
} = {
    style: SetStyle,
    className: SetClass,
    prop: SetSingleProp,
    table: SetTable,
    form: SetForm,
    layout: SetLayout,
    options: SetOptions,
    array: SetArray,
    project: SetProject,
};

export default editComponentsMap;
