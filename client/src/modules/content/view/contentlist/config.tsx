import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IColumn } from 'src/interfaces';
import { IPost } from 'src/interfaces/post';
import {
    renderContentStatus,
    renderContentTitle,
    renderDate,
} from '../../utils/renderCell';

export const columns: IColumn<IPost>[] = [
    {
        id: 'title',
        label: 'Tiêu đề',
        render: (post) => renderContentTitle(post),
    },
    {
        id: 'author',
        label: 'Tác giả',
        render: (post, author) => <>{author?.name}</>,
    },
    {
        id: 'createdAt',
        label: 'Ngày tạo',
        render: (post, value) => renderDate(value),
    },
    {
        id: 'publishDate',
        label: 'Ngày đăng',
        width: 200,
        render: (post, value) => renderDate(value),
    },
    {
        id: 'status',
        label: 'Trạng thái',
        render: (post, value) => renderContentStatus(value),
    },
];

export const actions = (onEdit?: any, onDelete?: any) => ({
    label: 'Thao tác',
    width: 140,
    align: 'center' as 'center',
    actions: [
        {
            icon: (post) => (
                <EditIcon
                    onClick={() => onEdit(post)}
                    titleAccess="Nhấn để  sửa"
                />
            ),
        },
        {
            icon: (post) => (
                <DeleteIcon
                    onClick={() => onDelete(post)}
                    color="error"
                    titleAccess="Nhấn để  xóa"
                />
            ),
        },
    ],
});
