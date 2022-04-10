import { memo, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Header, SideMenu, Footer } from './components';

const Layout = ({ children }) => {
    const [open, setOpen] = useState(true);
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header open={open} setOpen={setOpen} />
            <SideMenu open={open} setOpen={setOpen} />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        {children}
                    </Grid>
                    <Footer sx={{ pt: 4 }} />
                </Container>
            </Box>
        </Box>
    );
};

export default memo(Layout);
