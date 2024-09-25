const SOCIAL_LOGIN = [
  { type: 'kakao', text: '카카오' },
  { type: 'google', text: '구글' },
];

const Login = () => {
  const handleLoginClick = (type: string) => () => {
    window.location.href = `/oauth2/authorization/${type}`;
  };

  return (
    <div>
      {SOCIAL_LOGIN.map(({ type, text }) => (
        <button key={type} type='button' onClick={handleLoginClick(type)}>
          {text} 계정으로 계속하기
        </button>
      ))}
    </div>
  );
};

export default Login;
