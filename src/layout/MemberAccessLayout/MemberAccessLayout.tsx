import useAppSelector from '@/hooks/useAppSelector';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const MemberAccessLayout = () => {
  const user = useAppSelector((state) => state.user.info);
  const { pathname } = useLocation();

  if (!user) return <Navigate to={'/login'} replace />;
  if (pathname === '/user/gender' && user.gender)
    return <Navigate to={'/user'} replace />;

  return <Outlet />;
};

export default MemberAccessLayout;
