import { Alert, Snackbar } from '@mui/material';
import { memo, useState } from 'react';
import { IResponse } from 'src/interfaces/request';

const RequestAlert = ({ success, message }: IResponse) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert
                onClose={handleClose}
                severity={success ? 'success' : 'error'}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default memo(RequestAlert);
