import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage } from '@/pages/Home';

import { BaseLayout } from '../layouts';

import { AuthGuard } from './AuthGuard';
const NotFoundPage = lazy(() =>
  import('@/pages/NotFound').then((module) => ({
    default: module.NotFoundPage,
  }))
);
const SearchPage = lazy(() =>
  import('@/pages/Search').then((module) => ({
    default: module.SearchPage,
  }))
);
const FeedbackPage = lazy(() =>
  import('@/pages/Feedback').then((module) => ({
    default: module.FeedbackPage,
  }))
);
const LoginPage = lazy(() =>
  import('@/pages/Login').then((module) => ({
    default: module.LoginPage,
  }))
);
const LoginAuthPage = lazy(() =>
  import('@/pages/LoginAuth').then((module) => ({
    default: module.LoginAuthPage,
  }))
);
const UserGenderPage = lazy(() =>
  import('@/pages/UserGender').then((module) => ({
    default: module.UserGenderPage,
  }))
);
const UserPage = lazy(() =>
  import('@/pages/User').then((module) => ({
    default: module.UserPage,
  }))
);
const LookbookCreatePage = lazy(() =>
  import('@/pages/LookbookCreate').then((module) => ({
    default: module.LookbookCreatePage,
  }))
);
const TermsOfServicePage = lazy(() =>
  import('@/pages/TermsOfService').then((module) => ({
    default: module.TermsOfServicePage,
  }))
);
const PrivacyPolicyPage = lazy(() =>
  import('@/pages/PrivacyPolicy').then((module) => ({
    default: module.PrivacyPolicyPage,
  }))
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
        ],
      },
      {
        path: '/lookbook/create',
        element: <LookbookCreatePage />,
      },
      {
        path: '/not-found',
        element: <NotFoundPage />,
      },
    ],
  },
  { path: '/terms-of-service', element: <TermsOfServicePage /> },
  { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
]) as ReturnType<typeof createBrowserRouter>;

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
