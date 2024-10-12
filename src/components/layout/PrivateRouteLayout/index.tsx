import useAppSelector from '@/hooks/useAppSelector';
import { Navigate, useLocation } from 'react-router-dom';

type PrivateLayoutProps = {
  children: React.ReactNode;
};

const PrivateRouteLayout = ({ children }: PrivateLayoutProps) => {
  const user = useAppSelector((state) => state.user.user);
  const { pathname } = useLocation();

  if (!user) return <Navigate to={'/login'} replace />;
  if (pathname === '/user/gender' && user.gender)
    return <Navigate to={'/user'} replace />;

  return children;
};

export default PrivateRouteLayout;
