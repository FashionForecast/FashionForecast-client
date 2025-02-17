import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { setMemberGender } from '@/entities/member';
import { memberActions } from '@/entities/member/model/slice';
import { Gender } from '@/entities/member/model/types';

import { useAppDispatch } from '@/shared/lib/useAppDispatch';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import {
  Button,
  HeadHelmet,
  FemaleIcon,
  MaleIcon,
  ClothesIcon,
} from '@/shared/ui';

import UserGenderHeader from '../../UserGenderHeader/UserGenderHeader';

import { S } from './UserGenderPage.style';

const BUTTONS = [
  { text: '남자', value: 'MALE', icon: <MaleIcon /> },
  { text: '여자', value: 'FEMALE', icon: <FemaleIcon /> },
];

export const UserGenderPage = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const [gender, setGender] = useState<Gender | ''>('');
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (accessToken: string) => setMemberGender(gender, accessToken),
  });

  const handleSubmitClick = () => {
    if (!gender || !accessToken) return;

    mutate(accessToken, {
      onSuccess: () => {
        dispatch(memberActions.setGender(gender));
        navigate('/user');
      },
      onError: () => navigate('/login'),
    });
  };

  return (
    <>
      <HeadHelmet
        title='성별 설정'
        description='성별을 설정해주세요.'
        urlPath='/user/gender'
      />

      <S.UserGenderWrap>
        <UserGenderHeader />

        <S.SectionWrap>
          <S.ImageWrap>
            <ClothesIcon name='바지' />
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
          <Button
            variant='contained'
            size='large'
            fullWidth
            disabled={!gender}
            onClick={handleSubmitClick}
          >
            개인화된 OOTC 시작하기
          </Button>
        </S.SubmitButtonWrap>
      </S.UserGenderWrap>
    </>
  );
};
