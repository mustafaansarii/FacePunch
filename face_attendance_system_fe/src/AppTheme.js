import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const createAppTheme = (mode) => {
    let theme = createTheme({
        palette: {
            mode,
            primary: {
                main: mode === 'dark' ? '#6366f1' : '#4f46e5', // CareerHubs purple
            },
            secondary: {
                main: mode === 'dark' ? '#f472b6' : '#ec4899', // CareerHubs pink
            },
            background: {
                default: mode === 'dark' ? '#0f172a' : '#f9fafb', // Dark: slate-900, Light: gray-50
                paper: mode === 'dark' ? '#1e293b' : '#ffffff',  // Dark: slate-800, Light: white
            },
            text: {
                primary: mode === 'dark' ? '#f8fafc' : '#1e293b', // Dark: slate-50, Light: slate-900
                secondary: mode === 'dark' ? '#94a3b8' : '#64748b', // Dark: slate-400, Light: slate-500
            },
            divider: mode === 'dark' ? '#334155' : '#e2e8f0', // Dark: slate-700, Light: slate-200
        },
        typography: {
            fontFamily: [
                'Inter',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: '6px',
                        padding: '8px 16px',
                    },
                },
            },
            MuiTextField: {
                defaultProps: {
                    size: 'small',
                    variant: 'outlined',
                },
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '6px',
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: '8px',
                        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                    },
                },
            },
        },
    });

    return responsiveFontSizes(theme);
};

export default createAppTheme;