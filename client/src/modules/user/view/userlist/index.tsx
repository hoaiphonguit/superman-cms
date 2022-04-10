import { memo } from 'react';
import Grid from '@mui/material/Grid';
import { useAsync } from 'react-use';
import UserService from '../../service';
import SuperTable from 'src/components/table';
import { IColumn } from 'src/interfaces/table';
import { IUser } from 'src/interfaces';

const columns: IColumn<IUser>[] = [
    { id: 'id', label: 'id' },
    { id: 'username', label: 'Tên người dùng' },
    { id: 'name', label: 'Tên' },
];

const UserListView = () => {
    const state = useAsync(UserService.getList);
    const list = state.value?.list || [];
    console.log('list', list);
    return (
        <Grid item xs={12}>
            <SuperTable data={list} columns={columns} />
            {/* <TableContainer
                component={Paper}
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">
                                Protein&nbsp;(g)
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    {row.calories}
                                </TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">
                                    {row.protein}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </Grid>
    );
};

export default memo(UserListView);
