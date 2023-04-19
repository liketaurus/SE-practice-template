import React from 'react';
import './App.css';
import { Layout } from './components/layout/Layout';
import { Quiz } from './components/screens/Quiz/Quiz';
import { ColorProvider } from './components/context/ColorContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BASE_LINK } from './constants/quiz';

const router = createBrowserRouter([
  {
    path: `${BASE_LINK}`,
    element: <Quiz />,
  },
]);

function App() {
  return (
    <ColorProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </ColorProvider>
  );
}

export default App;
