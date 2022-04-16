import {
    CheckboxProps,
    RadioProps,
    SelectProps,
    SwitchProps,
    TextFieldProps,
} from '@mui/material';
import { GridColMap } from 'src/interfaces';
import { StandardTextFieldProps } from './components/StandardTextField';

export interface ICommonFieldProps<TComp extends keyof TComponentType> {
    id?: string;
    component:  TComp;
    /** Any additional props to pass to the Material UI component */
    props?: TComponentType[TComp];
    hideCondition?: boolean;
    label: string;
    attribute?: string;
    col?: GridColMap;
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
