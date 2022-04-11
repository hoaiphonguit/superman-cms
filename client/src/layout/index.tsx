import { createContext, memo, useMemo, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Header, SideMenu, Footer } from './components';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useToggle } from 'react-use';
import { LOCAL_STORAGE_DARK_MODE } from 'src/constants';

export const ColorModeContext = createContext({
    toggleColorMode: (): void => {},
});

const Layout = ({ children }) => {
    const [open, setOpen] = useState(true);
    const isDarkmode =
        localStorage[LOCAL_STORAGE_DARK_MODE] === 'true' ? true : false;
    const [mode, setMode] = useToggle(isDarkmode);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: !mode ? 'light' : 'dark',
                },
            }),
        [mode]
    );

    const toggleColorMode = () => {
        localStorage.setItem(LOCAL_STORAGE_DARK_MODE, (!mode).toString());
        setMode();
    };

    return (
        <ColorModeContext.Provider value={{ toggleColorMode }}>
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default memo(Layout);
