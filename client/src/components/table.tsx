import {
    Icon,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo, useState } from 'react';
import { ITable } from 'src/interfaces/table';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: 'bold',
        padding: 10,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: 16,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

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
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <TableContainer>
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
                                <StyledTableCell
                                    align={'center'}
                                    style={{ width: 80, textAlign: 'center' }}
                                >
                                    Thứ tự
                                </StyledTableCell>
                            )}
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id as any}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        width: column.width,
                                    }}
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
                                </StyledTableCell>
                            ))}
                            {actions && (
                                <StyledTableCell
                                    align={'center'}
                                    style={{
                                        width: actions.width || 120,
                                        textAlign: actions.align || 'left',
                                    }}
                                >
                                    {actions.label}
                                </StyledTableCell>
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
                                    <StyledTableRow
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
                                            <StyledTableCell
                                                style={{ textAlign: 'center' }}
                                            >
                                                {index + 1}
                                            </StyledTableCell>
                                        )}
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell
                                                    key={column.id as any}
                                                    align={column.align}
                                                >
                                                    {column.render
                                                        ? column.render(
                                                              row,
                                                              value,
                                                              index
                                                          )
                                                        : column.format &&
                                                          typeof value ===
                                                              'number'
                                                        ? column.format(value)
                                                        : value}
                                                </StyledTableCell>
                                            );
                                        })}
                                        {actions && (
                                            <StyledTableCell
                                                style={{
                                                    width: actions.width || 120,
                                                    textAlign:
                                                        actions.align || 'left',
                                                }}
                                            >
                                                {actions.actions.map(
                                                    (action, i) => (
                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                action.onClick(
                                                                    row
                                                                )
                                                            }
                                                            key={i}
                                                            color={
                                                                action.color ||
                                                                'inherit'
                                                            }
                                                        >
                                                            <Icon>
                                                                {typeof action.icon ===
                                                                'string'
                                                                    ? action.icon
                                                                    : typeof action.icon ===
                                                                      'function'
                                                                    ? action.icon(
                                                                          row
                                                                      )
                                                                    : ''}
                                                            </Icon>
                                                        </IconButton>
                                                    )
                                                )}
                                            </StyledTableCell>
                                        )}
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
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
