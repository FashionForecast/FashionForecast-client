import LoginFooter from './components/LoginFooter';
import LoginHeader from './components/LoginHeader';

const SOCIAL_LOGIN = [
  { type: 'kakao', text: '카카오' },
  { type: 'google', text: '구글' },
];

const Login = () => {
  const handleLoginClick = (type: string) => () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_URL
    }/oauth2/authorization/${type}`;
  };

  return (
    <div>
      <LoginHeader />

      {SOCIAL_LOGIN.map(({ type, text }) => (
        <button key={type} type='button' onClick={handleLoginClick(type)}>
          {text} 계정으로 계속하기
        </button>
      ))}

      <LoginFooter />
    </div>
  );
};

export default Login;
