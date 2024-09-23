import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isLoginSucess = JSON.parse(searchParams.get('social-login') || 'false');

  useEffect(() => {
    if (isLoginSucess) {
      getAccessToken();
      navigate('/');
    }
  }, []);

  if (isLoginSucess) return <div>로딩중</div>;
  return <div>페이지가 존재하지 않습니다</div>;
};

export default LoginAuth;

async function getAccessToken() {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/login/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const json = await res.json();
  console.log(json);
}
