import React, { useState, useMemo } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
} from '@mui/material';
import { getTheme } from './theme/muiTheme';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            pb: 8,
            transition: 'background-color 0.3s ease',
          }}
        >
          <Navbar mode={mode} toggleMode={toggleMode} />
          
          <Container maxWidth="xl" sx={{ pt: { xs: 10, md: 12 } }}>
            <AppRoutes />
          </Container>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
