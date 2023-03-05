import { Avatar, styled, Typography, typographyClasses } from '@mui/material';
import { IUser } from 'src/interfaces';
import { stringToColor } from 'src/utils/string';

const StyledName = styled(Typography)({
    [`&.${typographyClasses.root}`]: {
        fontSize: 16,
        fontWeight: 600,
    },
});
const StyledUsername = styled(Typography)(({ theme }) => ({
    [`&.${typographyClasses.root}`]: {
        fontSize: 14,
        color: theme.palette.grey[600],
    },
}));

const FlexDiv = styled('div')({
    display: 'flex',
});

export const renderUser = (user: IUser) => {
    if (!user) return <></>;

    return (
        <FlexDiv>
            <Avatar
                alt={user.name}
                src={user.avatar || '/'}
                style={{ backgroundColor: stringToColor(user.name) }}
            />
            <FlexDiv style={{ flexDirection: 'column', marginLeft: 10 }}>
                <StyledName>{user.name}</StyledName>
                <StyledUsername>{user.username}</StyledUsername>
            </FlexDiv>
        </FlexDiv>
    );
};
