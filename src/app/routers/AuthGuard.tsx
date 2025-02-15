import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '@/shared/lib/useAppSelector';

export const AuthGuard = () => {
  const user = useAppSelector((state) => state.member.info);
  const { pathname } = useLocation();

  if (!user) return <Navigate to={'/login'} replace />;
  if (pathname === '/user/gender' && user.gender)
    return <Navigate to={'/user'} replace />;

  return <Outlet />;
};
