import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import RootLayout from './components/layout/RootLayout';
import Search from './pages/Search';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import LoginAuth from './pages/LoginAuth';
import UserGender from './pages/UserGender';
import User from './pages/User';
import PrivateRouteLayout from './components/layout/PrivateRouteLayout';
import UserLookbookCreate from './pages/UserLookbookCreate';

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
      { path: '/feedback', element: <Feedback /> },
      { path: '/login', element: <Login /> },
      { path: '/login/auth', element: <LoginAuth /> },
      {
        path: '/user',
        element: (
          <PrivateRouteLayout>
            <User />
          </PrivateRouteLayout>
        ),
      },
      {
        path: '/user/gender',
        element: (
          <PrivateRouteLayout>
            <UserGender />
          </PrivateRouteLayout>
        ),
      },
      {
        path: '/user/lookbook/create',
        element: (
          <PrivateRouteLayout>
            <UserLookbookCreate />
          </PrivateRouteLayout>
        ),
      },
    ],
  },
]) as ReturnType<typeof createBrowserRouter>;
