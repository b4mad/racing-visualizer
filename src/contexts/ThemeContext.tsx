import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSystemTheme } from '../hooks/useSystemTheme';
import { PaletteMode, ThemeProvider as MUIThemeProvider } from '@mui/material';
import { getTheme } from '../theme';

interface ThemeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useSystemTheme();
  const [mode, setMode] = useState<PaletteMode>(systemTheme);

  useEffect(() => {
    setMode(systemTheme);
  }, [systemTheme]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode]
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
