import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NotFoundPage from '../NotFound/NotFoundPage';
import useAppDispatch from '@/hooks/useAppDispatch';
import { storeAccessToken, storeUser } from '@/utils/auth';

const LoginAuthPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoginSucess = JSON.parse(searchParams.get('social-login') || 'false');

  useEffect(() => {
    async function handleLogin() {
      try {
        const accessToken = await storeAccessToken(dispatch);
        const user = await storeUser(accessToken, dispatch);

        if (!user?.gender) {
          navigate('/user/gender');
          return;
        }

        navigate('/user');
      } catch {
        console.error('인증 과정중 문제가 발생했습니다.');
        navigate('/login');
      }
    }

    if (isLoginSucess) {
      handleLogin();
    }
  }, []);

  if (isLoginSucess) return <></>;
  return <NotFoundPage />;
};

export default LoginAuthPage;
