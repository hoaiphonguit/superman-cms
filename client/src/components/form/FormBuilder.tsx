import { Box, Grid } from '@mui/material';
import { Fragment, memo, useEffect } from 'react';
import { UseFormProps, UseFormReturn } from 'react-hook-form';
import { GridColMap } from 'src/interfaces';
import StandardTextField from './components/StandardTextField';
import { TFieldProp } from './interface';

function getFormComponent(field: TFieldProp, methods: UseFormReturn<any>) {
    switch (field.component) {
        case 'text-field':
        default:
            return <StandardTextField field={field} methods={methods} />;
    }
}

export interface IFormBuilderProps<TForm> {
    fields: Array<TFieldProp>;
    defaultValue?: UseFormProps<TForm>['defaultValues'];
    methods: UseFormReturn<any>;
}

function sanitizeColProps(col?: GridColMap): GridColMap {
    col = col || {};
    return {
        xs: col.xs || 12,
        sm: col.sm,
        md: col.md,
        lg: col.lg,
        xl: col.xl,
    };
}

function FormBuilder<TForm>(props: IFormBuilderProps<TForm>) {
    const { fields, defaultValue, methods } = props;

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
        </Box>
    );
}

export default memo(FormBuilder);
