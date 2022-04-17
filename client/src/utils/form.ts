import { isEmpty } from 'lodash';
import {
    ICommonFieldProps,
    SchemaType,
    TComponentType,
    TFieldProp,
    Validation,
    ValidationMethod,
} from 'src/interfaces';
import * as yup from 'yup';

export function getFormSchema(fields: Array<TFieldProp>) {
    const formSchema: { [x: string]: yup.AnySchema } = {};
    for (const field of fields) {
        if (field.attribute) {
            const fieldSchema = getFieldSchema(
                field.validationType,
                field.validations,
                field.label
            );
            if (!field.hideCondition) {
                formSchema[field.attribute] = fieldSchema;
            }
        }
    }
    const schema = yup.object(formSchema).required();
    return schema;
}

export function getFieldSchema<T extends keyof SchemaType>(
    schemaType?: T,
    validations?: Array<Validation>,
    label?: string
): SchemaType[T] {
    let schema: any;

    switch (schemaType) {
        case 'string':
            schema = yup.string();
            break;
        case 'number':
            schema = yup.number();
            break;
        case 'boolean':
            schema = yup.boolean();
            break;
        case 'date':
            schema = yup.date();
            break;
        case 'array':
            schema = yup.array();
            break;
        case 'mixed':
        default:
            schema = yup.mixed();
            break;
    }

    schema = schema.optional().label(label || 'This');

    for (let [key, value] of validations || []) {
        if (value === true) {
            schema = schema[key]();
        } else {
            if (Array.isArray(value) && !['oneOf', 'notOneOf'].includes(key)) {
                schema = schema[key](...value);
            } else {
                schema = schema[key](value);
            }
        }
    }
    return schema;
}

export function isRequiredField<TComp extends keyof TComponentType>(
    fieldConfig: ICommonFieldProps<TComp>
): boolean | undefined {
    return !isEmpty(
        fieldConfig.validations?.find(
            (validation) =>
                validation[0] === ValidationMethod.Required &&
                validation[1] === true
        )
    );
}
