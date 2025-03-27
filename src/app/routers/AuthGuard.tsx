import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '@/shared/lib/useAppSelector';

export const AuthGuard = () => {
  const member = useAppSelector((state) => state.member.info);
  const { pathname } = useLocation();

  if (!member) {
    return <Navigate to={'/login'} replace />;
  }

  if (pathname === '/user/gender' && member.gender) {
    return <Navigate to={'/user'} replace />;
  }

  return <Outlet />;
};
