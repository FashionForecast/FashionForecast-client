import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthGuard } from './AuthGuard';
import HomePage from '../../pages/Home/HomePage';
import { BaseLayout } from '../layouts';
const NotFoundPage = lazy(() => import('../../pages/NotFound/NotFoundPage'));
const SearchPage = lazy(() => import('../../pages/Search/SearchPage'));
const FeedbackPage = lazy(() => import('../../pages/Feedback/FeedbackPage'));
const LoginPage = lazy(() => import('../../pages/Login/LoginPage'));
const LoginAuthPage = lazy(() => import('../../pages/LoginAuth/LoginAuthPage'));
const UserGenderPage = lazy(
  () => import('../../pages/UserGender/UserGenderPage')
);
const UserPage = lazy(() => import('../../pages/User/UserPage'));
const UserLookbookCreatePage = lazy(
  () => import('../../pages/UserLookbookCreate/UserLookbookCreatePage')
);
const TermsOfServicePage = lazy(
  () => import('../../pages/TermsOfService/TermsOfServicePage')
);
const PrivacyPolicyPage = lazy(
  () => import('../../pages/PrivacyPolicy/PrivacyPolicyPage')
);

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '/', index: true, element: <HomePage /> },
      {
        path: '/search',
        element: <SearchPage />,
      },
      { path: '/feedback', element: <FeedbackPage /> },
      {
        path: '/login',
        children: [
          { index: true, element: <LoginPage /> },
          { path: 'auth', element: <LoginAuthPage /> },
        ],
      },
      {
        path: '/user',
        element: <AuthGuard />,
        children: [
          { index: true, element: <UserPage /> },
          { path: 'gender', element: <UserGenderPage /> },
          { path: 'lookbook/create', element: <UserLookbookCreatePage /> },
        ],
      },
    ],
  },
  { path: '/terms-of-service', element: <TermsOfServicePage /> },
  { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
]) as ReturnType<typeof createBrowserRouter>;

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
