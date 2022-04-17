import { Box, Grid } from '@mui/material';
import { memo, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { IFormBuilderProps, TFieldProp } from 'src/interfaces';
import { sanitizeColProps } from 'src/utils';
import StandardTextField from './components/StandardTextField';

export function getFormComponent(
    field: TFieldProp,
    methods: UseFormReturn<any>
) {
    switch (field.component) {
        case 'text-field':
        default:
            return <StandardTextField field={field} methods={methods} />;
    }
}

function FormBuilder<TForm>(props: IFormBuilderProps<TForm>) {
    const { fields, methods, errors, children } = props;

    useEffect(() => {
        if (errors) {
            for (const error of errors) {
                methods.setError(error.attribute, {
                    type: error.type,
                    message: error.message,
                });
            }
        }
    }, [errors]);

    return (
        <Box>
            <Grid container spacing={3}>
                {fields?.map((field, index) => {
                    return (
                        !field.hideCondition && (
                            <Grid
                                key={field.id || field.attribute || index}
                                {...sanitizeColProps(field.col)}
                                item
                            >
                                {getFormComponent(field, methods)}
                            </Grid>
                        )
                    );
                })}
            </Grid>
            {children}
        </Box>
    );
}

export default memo(FormBuilder);
