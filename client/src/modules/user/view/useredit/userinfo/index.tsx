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

function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const UserInfo = ({ username, name = '' }: IUser) => {
    return (
        <BoxInfo>
            <Avatar
                alt={name}
                src={''}
                {...stringAvatar(name)}
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
