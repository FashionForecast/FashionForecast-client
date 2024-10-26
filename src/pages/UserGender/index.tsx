import { S } from './style';
import UserGenderHeader from './UserGenderHeader';
import MaleImage from '@/assets/svg/gender/male.svg?react';
import FemaleImage from '@/assets/svg/gender/female.svg?react';
import { useState } from 'react';
import CustomButton from '@/components/CustomMui/CustomButton';
import { useMutation } from '@tanstack/react-query';
import { setUserGender } from '@/service/auth';
import useAppSelector from '@/hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';
import useAppDispatch from '@/hooks/useAppDispatch';
import { userActions } from '@/redux/slice/userSlice';
import 바지 from '@/components/clothes/바지';
import { Gender } from '@/types/user';

const BUTTONS = [
  { text: '남자', value: 'MALE', icon: <MaleImage /> },
  { text: '여자', value: 'FEMALE', icon: <FemaleImage /> },
];

const UserGender = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const [gender, setGender] = useState<Gender | ''>('');
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (accessToken: string) => setUserGender(gender, accessToken),
  });

  const handleSubmitClick = () => {
    if (!gender || !accessToken) return;

    mutate(accessToken, {
      onSuccess: () => {
        dispatch(userActions.setGender(gender));
        navigate('/user');
      },
      onError: () => navigate('/login'),
    });
  };

  return (
    <S.UserGenderWrap>
      <UserGenderHeader />

      <S.SectionWrap>
        <S.ImageWrap>
          <바지 />
        </S.ImageWrap>
        <h3>거의 다 왔어요!</h3>

        <p>
          나에게 딱 맞는 옷차림을 알려줄 수 있도록
          <br />
          성별 정보를 입력해주세요
        </p>

        <S.ButtonWrap>
          {BUTTONS.map(({ text, value, icon }) => (
            <S.GenderButton
              type='button'
              key={text}
              onClick={() => setGender(value as Gender)}
              $select={gender === value}
            >
              <div className='icon'>{icon}</div>
              {text}
            </S.GenderButton>
          ))}
        </S.ButtonWrap>
      </S.SectionWrap>

      <S.SubmitButtonWrap>
        <CustomButton
          variant='contained'
          size='large'
          fullWidth
          disabled={!gender}
          onClick={handleSubmitClick}
        >
          개인화된 OOTC 시작하기
        </CustomButton>
      </S.SubmitButtonWrap>
    </S.UserGenderWrap>
  );
};

export default UserGender;
