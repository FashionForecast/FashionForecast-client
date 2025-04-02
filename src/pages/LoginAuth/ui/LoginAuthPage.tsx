import { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { storeAccessToken } from '@/entities/auth';
import { storeMember } from '@/entities/member';

import { GUEST_OUTFIT } from '@/shared/consts/localStorageKey';
import { useAppDispatch } from '@/shared/lib';

export const LoginAuthPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoginSuccess = JSON.parse(
    searchParams.get('social-login') ?? 'false'
  );
  const isNewMember = JSON.parse(searchParams.get('isNewMember') ?? 'false');
  const canAddGuestOutfit = JSON.parse(
    searchParams.get('canAddGuestOutfit') ?? 'false'
  );

  useEffect(() => {
    async function handleLogin() {
      try {
        const accessToken = await storeAccessToken(dispatch);
        const member = await storeMember(accessToken, dispatch);

        if (isNewMember && canAddGuestOutfit) {
          localStorage.setItem(GUEST_OUTFIT, 'true');
        }

        if (!member?.gender) {
          navigate('/user/gender');
          return;
        }

        navigate('/user');
      } catch {
        console.error('인증 과정중 문제가 발생했습니다.');
        navigate('/login');
      }
    }

    if (isLoginSuccess) {
      handleLogin();
    }
  }, []);

  if (isLoginSuccess) return <></>;
  return <Navigate to={'/not-found'} replace />;
};
