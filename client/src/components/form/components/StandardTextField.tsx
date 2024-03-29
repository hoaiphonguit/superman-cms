import {
    Controller,
    ControllerRenderProps,
    UseFormReturn,
} from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { memo } from 'react';
import { ICommonFieldProps } from 'src/interfaces';
import { isRequiredField } from 'src/utils';

export interface StandardTextFieldProps
    extends ICommonFieldProps<'text-field'> {
    attribute: Required<ICommonFieldProps<'text-field'>>['attribute'];
}
const StandardTextField = (props: {
    field: StandardTextFieldProps;
    methods: UseFormReturn;
}) => {
    const {
        field: fieldConfig,
        methods: {
            control,
            formState: { errors },
        },
    } = props;

    const componentProps = (
        fieldConfig: StandardTextFieldProps,
        field: ControllerRenderProps
    ): TextFieldProps => {
        return {
            id: fieldConfig.attribute,
            fullWidth: true,
            size: 'small',
            label: fieldConfig.label,
            error: !!errors[fieldConfig.attribute],
            helperText: errors[fieldConfig.attribute]?.message,
            variant: 'outlined',
            required: isRequiredField(fieldConfig),
            ...fieldConfig.props,
            ...field,
            value: field.value || '',
        };
    };

    return (
        <Controller
            name={fieldConfig.attribute}
            control={control}
            render={({ field }) => (
                <TextField {...componentProps(fieldConfig, field)} />
            )}
        />
    );
};

export default memo(StandardTextField);
