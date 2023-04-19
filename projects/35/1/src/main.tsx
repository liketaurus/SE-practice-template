import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// 2. Update the breakpoints as key-value pairs
const breakpoints = {
  sm: '425px',
  md: '768px',
  lg: '992px',
  xl: '1280px',
  '2xl': '1536px',
};

// 3. Extend the theme
export const theme = extendTheme({ breakpoints });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
