import { createTheme, PaletteMode } from '@mui/material';

export const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light' 
      ? {
          // Light mode colors
          primary: {
            main: '#1976d2',
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          chart: {
            text: 'rgba(0, 0, 0, 0.6)',
            grid: 'rgba(0, 0, 0, 0.1)',
          },
        }
      : {
          // Dark mode colors
          primary: {
            main: '#90caf9',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          chart: {
            text: 'rgba(255, 255, 255, 0.6)',
            grid: 'rgba(255, 255, 255, 0.1)',
          },
        }),
  },
});
