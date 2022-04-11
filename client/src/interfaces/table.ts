import { ReactNode } from 'react';

export interface IColumn<T> {
    id: keyof T;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
    render?: (value) => ReactNode;
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
        actions: {
            icon: string;
            onClick: any;
        }[];
    };
}

export type Order = 'asc' | 'desc';
