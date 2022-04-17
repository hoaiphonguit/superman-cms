import { GridColMap } from 'src/interfaces';

export function sanitizeColProps(col?: GridColMap): GridColMap {
    col = col || {};
    return {
        xs: col.xs || 12,
        sm: col.sm,
        md: col.md,
        lg: col.lg,
        xl: col.xl,
    };
}
