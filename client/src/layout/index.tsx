import { createContext, memo, useMemo } from 'react';
import { Header, SideMenu, Footer } from './components';
import { useToggle } from 'react-use';
import { LOCAL_STORAGE_DARK_MODE } from 'src/constants';
import {
    Box,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    ThemeProvider,
    Toolbar,
} from '@mui/material';

export const ColorModeContext = createContext({
    toggleColorMode: (): void => {},
});

const Layout = ({ children }: { children: any }) => {
    const isDarkmode =
        localStorage[LOCAL_STORAGE_DARK_MODE] === 'true' ? true : false;
    const [mode, setMode] = useToggle(isDarkmode);

    const appTheme = useMemo(
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
            <ThemeProvider theme={appTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Header />
                    <SideMenu />
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
