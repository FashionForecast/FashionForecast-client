import { S } from './style';
import UserGenderHeader from './UserGenderHeader';
import 바지 from '@/assets/svg/clothes/바지.svg?react';
import MaleImage from '@/assets/svg/gender/male.svg?react';
import FemaleImage from '@/assets/svg/gender/female.svg?react';
import { useState } from 'react';
import CustomButton from '@/components/CustomMui/CustomButton';

const BUTTONS = [
  { text: '남자', icon: <MaleImage /> },
  { text: '여자', icon: <FemaleImage /> },
];

const UserGender = () => {
  const [gender, setGender] = useState('');

  return (
    <S.UserGenderWrap>
      <UserGenderHeader />

      <S.SectionWrap>
        <바지 />
        <title>거의 다 왔어요!</title>

        <p>
          나에게 딱 맞는 옷차림을 알려줄 수 있도록
          <br />
          성별 정보를 입력해주세요
        </p>

        <S.ButtonWrap>
          {BUTTONS.map(({ text, icon }) => (
            <S.GenderButton
              type='button'
              key={text}
              onClick={() => setGender(text)}
              $select={gender === text}
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
        >
          개인화된 OOTC 시작하기
        </CustomButton>
      </S.SubmitButtonWrap>
    </S.UserGenderWrap>
  );
};

export default UserGender;
