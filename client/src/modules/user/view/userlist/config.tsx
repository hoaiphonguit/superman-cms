import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import ShieldIcon from '@mui/icons-material/Shield';
import { IColumn, IUser } from 'src/interfaces';
import { renderDate } from 'src/modules/content/utils/renderCell';
import { renderUser } from '../../utils/renderCell';

export const columns: IColumn<IUser>[] = [
    { id: 'name', label: 'Họ và tên', render: (user) => renderUser(user) },
    { id: 'phone', label: 'SĐT' },
    {
        id: 'createdAt',
        label: 'Ngày tạo',
        render: (post, value) => renderDate(value),
    },
    {
        id: 'lastModified',
        label: 'Hoạt động cuối',
        render: (post, value) => renderDate(value),
    },
];

export const actions = (onEdit?: any, onDelete?: any, onBanUser?: any) => ({
    label: 'Thao tác',
    width: 140,
    align: 'center' as 'center',
    actions: [
        {
            icon: (user) => (
                <EditIcon
                    onClick={() => onEdit(user)}
                    titleAccess="Nhấn để  sửa"
                />
            ),
        },
        {
            icon: (user) => (
                <DeleteIcon
                    onClick={() => onDelete(user)}
                    color="error"
                    titleAccess="Nhấn để  xóa"
                />
            ),
        },
        {
            icon: (user: IUser) => {
                return (
                    <>
                        {user.baned && (
                            <RemoveModeratorIcon
                                onClick={() => onBanUser(user)}
                                color="warning"
                                titleAccess="Nhấn để mở khóa"
                            />
                        )}
                        {!user.baned && (
                            <ShieldIcon
                                onClick={() => onBanUser(user)}
                                color="success"
                                titleAccess="Nhấn để  khóa"
                            />
                        )}
                    </>
                );
            },
        },
    ],
});
