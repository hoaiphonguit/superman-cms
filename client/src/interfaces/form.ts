import {
    CheckboxProps,
    RadioProps,
    SelectProps,
    SwitchProps,
    TextFieldProps,
} from '@mui/material';
import { Path, UseFormProps, UseFormReturn } from 'react-hook-form';
import { StandardTextFieldProps } from 'src/components/form/components';
import { GridColMap } from './layout';
import * as yup from 'yup';

export interface IFormBuilderProps<TForm> {
    fields: Array<TFieldProp>;
    defaultValue?: UseFormProps<TForm>['defaultValues'];
    methods: UseFormReturn<any>;
    errors?: Array<IFormError<TForm>>;
    children?: React.ReactNode;
}

export interface ICommonFieldProps<TComp extends keyof TComponentType> {
    id?: string;
    component: TComp;
    /** Any additional props to pass to the Material UI component */
    props?: TComponentType[TComp];
    hideCondition?: boolean;
    label: string;
    attribute?: string;
    col?: GridColMap;
    /** One of: `mixed`, `string`, `number`, `date`, `boolean`, `array` */
    validationType?: keyof SchemaType;
    validations?: Array<Validation>;
}

export type TComponentType = {
    'text-field': Partial<TextFieldProps>;
    select: Partial<SelectProps>;
    'checkbox-group': Partial<CheckboxProps>;
    'radio-group': Partial<RadioProps>;
    switch: Partial<SwitchProps>;
    custom: any;
};

export type TFieldProp = StandardTextFieldProps;

export type SchemaType = {
    string: yup.StringSchema;
    number: yup.NumberSchema;
    boolean: yup.BooleanSchema;
    date: yup.DateSchema;
    array: yup.ArraySchema<yup.AnySchema>;
    mixed: yup.AnySchema;
};

export const ValidationMethod = {
    Required: 'required',
    Length: 'length',
    Min: 'min',
    Max: 'max',
    Matches: 'matches',
    Email: 'email',
    Url: 'url',
    Uuid: 'uuid',
    LessThan: 'lessThan',
    MoreThan: 'moreThan',
    Positive: 'positive',
    Negative: 'negative',
    Integer: 'integer',
    OneOf: 'oneOf',
    NotOneOf: 'notOneOf',
    Test: 'test',
    When: 'when',
} as const;

export type ValidationMethod =
    typeof ValidationMethod[keyof typeof ValidationMethod];

export type Validation = [
    ValidationMethod,
    true | string | number | Date | RegExp | Array<any>
];

interface IFormError<T> {
    attribute: Path<T>;
    type: string;
    message: string;
}
