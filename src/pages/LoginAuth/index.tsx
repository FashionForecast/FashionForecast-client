import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NotFound from '../NotFound';
import useAppDispatch from '@/hooks/useAppDispatch';
import { storeAccessToken } from '@/utils/auth';

const LoginAuth = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoginSucess = JSON.parse(searchParams.get('social-login') || 'false');

  useEffect(() => {
    if (isLoginSucess) {
      storeAccessToken(dispatch);
      navigate('/');
    }
  }, []);

  if (isLoginSucess) return <></>;
  return <NotFound />;
};

export default LoginAuth;
