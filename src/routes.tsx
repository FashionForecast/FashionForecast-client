import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import RootLayout from './layout/RootLayout/RootLayout';
import SearchPage from './pages/Search/SearchPage';
import FeedbackPage from './pages/Feedback/FeedbackPage';
import LoginPage from './pages/Login/LoginPage';
import LoginAuthPage from './pages/LoginAuth/LoginAuthPage';
import UserGenderPage from './pages/UserGender/UserGenderPage';
import UserPage from './pages/User/UserPage';
import MemberAccessLayout from './layout/MemberAccessLayout/MemberAccessLayout';
import UserLookbookCreatePage from './pages/UserLookbookCreate/UserLookbookCreatePage';
import TermsOfServicePage from './pages/TermsOfService/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicy/PrivacyPolicyPage';

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
