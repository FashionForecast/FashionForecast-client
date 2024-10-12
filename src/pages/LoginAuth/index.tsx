import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NotFound from '../NotFound';
import useAppDispatch from '@/hooks/useAppDispatch';
import { storeAccessToken, storeUser } from '@/utils/auth';

const LoginAuth = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoginSucess = JSON.parse(searchParams.get('social-login') || 'false');

  useEffect(() => {
    async function handleLogin() {
      const accessToken = await storeAccessToken(dispatch);
      const user = await storeUser(accessToken, dispatch);

      if (!user?.gender) {
        navigate('/user/gender');
        return;
      }

      navigate('/user');
    }

    if (isLoginSucess) {
      handleLogin();
    }
  }, []);

  if (isLoginSucess) return <></>;
  return <NotFound />;
};

export default LoginAuth;
