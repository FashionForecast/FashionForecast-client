import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout/RootLayout';
import MemberAccessLayout from './layout/MemberAccessLayout/MemberAccessLayout';
import HomePage from './pages/Home/HomePage';
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFoundPage'));
const SearchPage = lazy(() => import('./pages/Search/SearchPage'));
const FeedbackPage = lazy(() => import('./pages/Feedback/FeedbackPage'));
const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const LoginAuthPage = lazy(() => import('./pages/LoginAuth/LoginAuthPage'));
const UserGenderPage = lazy(() => import('./pages/UserGender/UserGenderPage'));
const UserPage = lazy(() => import('./pages/User/UserPage'));
const UserLookbookCreatePage = lazy(
  () => import('./pages/UserLookbookCreate/UserLookbookCreatePage')
);
const TermsOfServicePage = lazy(
  () => import('./pages/TermsOfService/TermsOfServicePage')
);
const PrivacyPolicyPage = lazy(
  () => import('./pages/PrivacyPolicy/PrivacyPolicyPage')
);

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
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
        element: <MemberAccessLayout />,
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
