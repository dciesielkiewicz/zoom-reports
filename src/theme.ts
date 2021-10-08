import { createTheme, Theme } from '@mui/material';

declare module '@mui/styles' {
  interface DefaultTheme extends Theme {}
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    warning: {
      main: '#ffa726',
      light: '#ffb74d',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 540,
      md: 768,
      lg: 960,
      xl: 1280,
    },
  },
  components: {
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: 16,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
        },
        sizeSmall: {
          padding: '6px 16px'
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
  },
});
