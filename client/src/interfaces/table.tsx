import { IconButtonPropsColorOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { ReactNode } from 'react';

export interface IColumn<T> {
    id: keyof T;
    label: string;
    minWidth?: number;
    width?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
    render?: (row: any, value: any, index: number) => ReactNode;
}

export interface ITable<T> {
    columns: IColumn<T>[];
    data: readonly T[];
    numSelected?: number;
    onSort?: (event: React.MouseEvent<unknown>, property: keyof T) => void;
    onSelectAll?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order?: Order;
    orderBy?: string;
    rowCount?: number;
    hasIndex?: boolean;
    actions?: {
        label: string;
        width?: number;
        align?: 'left' | 'center' | 'right',
        actions: {
            icon: string | ((row: T) => string | ReactNode);
            color?: OverridableStringUnion<
                | 'inherit'
                | 'default'
                | 'primary'
                | 'secondary'
                | 'error'
                | 'info'
                | 'success'
                | 'warning',
                IconButtonPropsColorOverrides
            >;
            onClick?: any;
        }[];
    };
}

export type Order = 'asc' | 'desc';
