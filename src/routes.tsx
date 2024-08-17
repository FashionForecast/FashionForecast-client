import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    element: <Outlet />,
    errorElement: <NotFound />,
    children: [{ path: '/', index: true, element: <Home /> }],
  },
]) as ReturnType<typeof createBrowserRouter>;
