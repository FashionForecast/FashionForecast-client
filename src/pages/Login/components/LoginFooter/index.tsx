import CustomButton from '@/components/CustomMui/CustomButton';
import { S } from './style';

const LoginFooter = () => {
  return (
    <S.Footer>
      <CustomButton color='inherit'>이용약관</CustomButton>
      <S.Divider />
      <CustomButton color='inherit'>개인정보처리방침</CustomButton>
    </S.Footer>
  );
};

export default LoginFooter;
