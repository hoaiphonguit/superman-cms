import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    styled,
} from '@mui/material';
import { Dispatch, memo, SetStateAction } from 'react';

const StyledComfirmDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
    },
    '& .MuiDialogTitle-root': {
        padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(3),
    },
}));

interface IProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    title: string;
    content?: string;
    onOk?: any;
    okText?: string;
    onCancel?: any;
    cancelText?: string;
}

const ConfirmDialog = ({
    open,
    setOpen,
    title,
    content,
    onOk,
    okText = 'Đồng ý',
    onCancel,
    cancelText = 'Hủy',
}: IProps) => {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <StyledComfirmDialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            {content && (
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
            )}
            <DialogActions>
                <Button onClick={onCancel || handleClose} variant="outlined">
                    {cancelText}
                </Button>
                <Button
                    onClick={onOk || handleClose}
                    autoFocus
                    variant="contained"
                    disableElevation
                >
                    {okText}
                </Button>
            </DialogActions>
        </StyledComfirmDialog>
    );
};

export default memo(ConfirmDialog);
