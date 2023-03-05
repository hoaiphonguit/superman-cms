import { Avatar, Box, Chip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo } from 'react';
import { IUser } from 'src/interfaces';
import { stringToColor } from 'src/utils/string';

const BoxInfo = styled(Box)<{ component?: React.ElementType }>({
    display: 'flex',
    '& .MuiAvatar-root': {
        marginRight: '20px',
    },
});

const UserInfo = ({ username, name = '', avatar }: IUser) => {
    return (
        <BoxInfo>
            <Avatar
                alt={name}
                src={avatar || '/'}
                sx={{ width: 64, height: 64, bgColor: stringToColor(name) }}
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
