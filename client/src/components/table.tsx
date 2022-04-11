import { memo, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { ITable } from 'src/interfaces/table';
import { Icon } from '@mui/material';

function SuperTable<T>({
    columns,
    data,
    numSelected,
    rowCount,
    onSelectAll,
    orderBy,
    order,
    onSort,
    hasIndex,
    actions,
}: ITable<T>) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState<readonly number[]>([]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // const createSortHandler =
    //     (property: keyof T) => (event: React.MouseEvent<unknown>) => {
    //         onSort(event, property);
    //     };

    const isSelected = (index: number) => selected.indexOf(index) !== -1;

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    indeterminate={
                                        numSelected > 0 &&
                                        numSelected < rowCount
                                    }
                                    checked={
                                        rowCount > 0 && numSelected === rowCount
                                    }
                                    onChange={onSelectAll}
                                    inputProps={{
                                        'aria-label': 'select all desserts',
                                    }}
                                />
                            </TableCell> */}
                            {hasIndex && (
                                <TableCell
                                    align={'center'}
                                    style={{ width: 110 }}
                                >
                                    <TableSortLabel>Thứ tự</TableSortLabel>
                                </TableCell>
                            )}
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id as any}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    // sortDirection={
                                    //     orderBy === column.id ? order : false
                                    // }
                                >
                                    <TableSortLabel
                                    // active={orderBy === column.id}
                                    // direction={
                                    //     orderBy === column.id
                                    //         ? order
                                    //         : 'asc'
                                    // }
                                    // onClick={createSortHandler(column.id)}
                                    >
                                        {column.label}
                                        {/* {orderBy === column.id ? (
                                            <Box
                                                component="span"
                                                sx={visuallyHidden}
                                            >
                                                {order === 'desc'
                                                    ? 'sorted descending'
                                                    : 'sorted ascending'}
                                            </Box>
                                        ) : null} */}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            {actions && (
                                <TableCell
                                    align={'center'}
                                    style={{ width: 120 }}
                                >
                                    <TableSortLabel>
                                        {actions.label}
                                    </TableSortLabel>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => {
                                const isItemSelected = isSelected(index);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        // selected={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                    >
                                        {/* <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell> */}
                                        {hasIndex && (
                                            <TableCell>{index + 1}</TableCell>
                                        )}
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id as any}
                                                    align={column.align}
                                                >
                                                    {column.format &&
                                                    typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        {actions && (
                                            <TableCell>
                                                {actions.actions.map(
                                                    (action, i) => (
                                                        <Icon
                                                            onClick={() =>
                                                                action.onClick(
                                                                    row
                                                                )
                                                            }
                                                            key={i}
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            {action.icon}
                                                        </Icon>
                                                    )
                                                )}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default memo(SuperTable) as typeof SuperTable;
