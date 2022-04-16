import { Avatar, Box, Chip, Typography } from '@mui/material';
import { memo } from 'react';
import { styled } from '@mui/material/styles';
import { IUser } from 'src/interfaces';

const BoxInfo = styled(Box)<{ component?: React.ElementType }>({
    display: 'flex',
    '& .MuiAvatar-root': {
        marginRight: '20px',
    },
});

const UserInfo = ({ username, name = '' }: IUser) => {
    return (
        <BoxInfo>
            <Avatar
                alt={name}
                src={''}
                sx={{ width: 64, height: 64 }}
            />
            <div>
                <Typography variant="h5">{name}</Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                    user_name: <Chip label={username} size="small" />
                </Typography>
            </div>
        </BoxInfo>
    );
};

export default memo(UserInfo);
