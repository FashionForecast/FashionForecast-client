import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import RootLayout from './components/layout/RootLayout';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [{ path: '/', index: true, element: <Home /> }],
  },
]) as ReturnType<typeof createBrowserRouter>;
