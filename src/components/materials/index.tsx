import { IMaterial } from '@/types/making';
import { DivMaterial } from './DivTag';
import { SpanMaterial } from './SpanTag';
import { PMaterial } from './PTag';
import { GenerateFormMaterial } from './GenerateForm';
import { ListFilterMaterial } from './ListFilter';
import { ModalMaterial } from './Modal';
import { GenerateModalMaterial } from './GenerateModal';
import { CurrencyFormatterMaterial } from './CurrencyFormatter';
import { SubHeaderMaterial } from './SubHeader';
import { ImgMaterial } from './ImgTag';
import { TableMaterial } from './Table';
import { ColMaterial } from './Col';
import { RowMaterial } from './Row';
import { ButtonMaterial } from './Button';
import { FormMaterial } from './Form';
import { FormItemMaterial } from './FormItem';
import { InputMaterial } from './Input';
import { InputNumberMaterial } from './InputNumber';
import { SelectMaterial } from './Select';
import { PasswordMaterial } from './Password';
import { DatePickerMaterial } from './DatePicker';
import { MonthPickerMaterial } from './MonthPicker';
import { CheckboxGroupMaterial } from './CheckboxGroup';
import { TextAreaGroupMaterial } from './TextAreaGroup';
import { RadioGroupMaterial } from './RadioGroup';
import { RangePickerMaterial } from './RangePicker';
import { BreadCrumbMaterial } from './Breadcrumb';
import { PageHeaderLayoutMaterial } from './PageHeaderLayout';
import { LytListFilter } from './LytListFilter';
import { LytTableMaterial } from './LytTable';

const materials: IMaterial[] = [
    RowMaterial,
    ColMaterial,
    ButtonMaterial,
    DivMaterial,
    SpanMaterial,
    PMaterial,
    TableMaterial,
    LytTableMaterial,
    ModalMaterial,
    GenerateFormMaterial,
    ListFilterMaterial,
    FormMaterial,
    FormItemMaterial,
    InputMaterial,
    TextAreaGroupMaterial,
    SelectMaterial,
    CheckboxGroupMaterial,
    RadioGroupMaterial,
    InputNumberMaterial,
    PasswordMaterial,
    DatePickerMaterial,
    MonthPickerMaterial,
    RangePickerMaterial,
    GenerateModalMaterial,
    CurrencyFormatterMaterial,
    SubHeaderMaterial,
    ImgMaterial,
    BreadCrumbMaterial,
    PageHeaderLayoutMaterial,
    LytListFilter,
];

export default materials;
