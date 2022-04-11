import { Dispatch, memo, SetStateAction } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

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
        <Dialog
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
                <Button onClick={onCancel || handleClose}>{cancelText}</Button>
                <Button onClick={onOk || handleClose} autoFocus>
                    {okText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default memo(ConfirmDialog);
