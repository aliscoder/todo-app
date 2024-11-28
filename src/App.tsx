import React from 'react';
import { CssBaseline, ThemeProvider, Container, Button, Box, Typography } from '@mui/material';
import TodoList from './components/TodoList';
import { useTheme } from './hooks/useTheme';
import {  Bedtime, LightMode  } from '@mui/icons-material';

const App: React.FC = () => {
  const {theme , toggleTheme , isDarkMode} = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth='md'>
        <Box alignItems='center' paddingY={4} display='flex' flexDirection='row' justifyContent='space-between' width='100%' >
        <Typography fontSize={32}>Todo App</Typography>
        <Button onClick={toggleTheme}>
          {isDarkMode ? <Bedtime /> : <LightMode />}
        </Button>
        </Box>
        <TodoList />
      </Container>
    </ThemeProvider>
  );
};

export default App;
