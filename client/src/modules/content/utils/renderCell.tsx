import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import {
    Avatar,
    avatarClasses,
    Chip,
    Link,
    linkClasses,
    styled
} from '@mui/material';
import dayjs from 'dayjs';
import { EPostStatus, IPost } from 'src/interfaces/post';

const StyledLink = styled(Link)(({ theme }) => ({
    [`&.${linkClasses.root}`]: {
        color: theme.palette.text.primary,
        fontSize: 16,
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
    },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    [`&.${avatarClasses.root}`]: {
        width: 80,
        height: 80,
        marginRight: 20,
    },
}));

export const renderContentTitle = (post: IPost) => {
    if (!post) return <></>;

    return (
        <StyledLink underline="hover" href={post.url}>
            <StyledAvatar
                variant="rounded"
                alt={post.title}
                src={post.thumbUrl}
            >
                <PhotoSizeSelectActualOutlinedIcon />
            </StyledAvatar>
            {post.title}
        </StyledLink>
    );
};

export const renderContentStatus = (status: EPostStatus) => {
    let label = '';
    let type = 'default';
    switch (+status) {
        case EPostStatus.DRAFT:
            label = 'Đang biên tập';
            type = 'warning';
            break;
        case EPostStatus.SUBMITTED:
            label = 'Đã gửi';
            type = 'secondary';
            break;
        case EPostStatus.SUBMITTED_RETURN:
            label = 'Biên tập lại';
            type = 'error';
            break;
        case EPostStatus.APPROVED:
            label = 'Đã duyệt';
            type = 'success';
            break;
        case EPostStatus.PUBLISHED:
            label = 'Đã đăng';
            type = 'primary';
            break;
        case EPostStatus.DISCONTINUTED:
            label = 'Đã hủy';
            type = 'error';
            break;
    }
    return <Chip label={label} color={type as any} />;
};

export const renderDate = (date: number) => {
    if (!date) return <></>;

    return <Chip label={dayjs(date).format('DD-MM-YYYY HH:mm:ss')} />;
};
