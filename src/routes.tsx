import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import RootLayout from './components/layout/RootLayout';
import Search from './pages/Search';
// import Login from './pages/Login';
// import LoginAuth from './pages/LoginAuth';
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', index: true, element: <Home /> },
      {
        path: '/search',
        element: <Search />,
      },
      // { path: '/login', element: <Login /> },
      // { path: '/login/auth', element: <LoginAuth /> },
    ],
  },
]) as ReturnType<typeof createBrowserRouter>;
