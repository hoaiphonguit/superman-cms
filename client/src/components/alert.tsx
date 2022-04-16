import { memo, useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { IResponse } from 'src/interfaces';

const RequestAlert = ({ success, message }: IResponse) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        setOpen(true);
    }, [success, message]);

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
