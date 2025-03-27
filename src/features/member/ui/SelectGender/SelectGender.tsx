import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ClothesIcon } from '@/entities/clothes/ui/ClothesIcon/ClothesIcon';
import { Gender } from '@/entities/member';
import { memberActions } from '@/entities/member/model/slice';

import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { Button, FemaleIcon, MaleIcon } from '@/shared/ui';

import { setMemberGender } from '../../api/member';

import { C, S } from './SelectGender.style';

const BUTTONS: Array<{
  gender: Gender;
  text: string;
  Icon: React.FC<React.ComponentProps<typeof MaleIcon | typeof FemaleIcon>>;
}> = [
  { gender: 'MALE', text: '남자', Icon: MaleIcon },
  { gender: 'FEMALE', text: '여자', Icon: FemaleIcon },
];

export const SelectGender = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [selectedGender, setSelectedGender] = useState<Gender | ''>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => setMemberGender(selectedGender, accessToken),
  });

  const handleSubmitClick = () => {
    if (!selectedGender) return;

    mutate(undefined, {
      onSuccess: () => {
        dispatch(memberActions.setGender(selectedGender));
        navigate('/user');
      },
      onError: () => navigate('/login'),
    });
  };
  return (
    <S.SelectGenderWrap>
      <S.Article>
        <S.ClothesGroup>
          <ClothesIcon name='면바지' color='#80C3FF' />
          <ClothesIcon name='스커트 스타킹' color='#F2D41B' />
        </S.ClothesGroup>

        <S.Title>거의 다 왔어요!</S.Title>

        <S.Description>
          나에게 딱 맞는 옷차림을 알려줄 수 있도록
          <br />
          성별 정보를 입력해주세요
        </S.Description>

        <S.GenderButtonGroup>
          {BUTTONS.map(({ gender, text, Icon }) => (
            <C.GenderButton
              key={gender}
              label={text}
              direction='vertical'
              selected={selectedGender === gender}
              iconPosition={{
                top: (
                  <Icon
                    color={selectedGender === gender ? 'white' : 'primary'}
                  />
                ),
              }}
              onClick={() => setSelectedGender(gender)}
            />
          ))}
        </S.GenderButtonGroup>
      </S.Article>

      <Button
        size='large'
        fullWidth
        disabled={!selectedGender}
        onClick={handleSubmitClick}
      >
        OOTC 시작하기
      </Button>
    </S.SelectGenderWrap>
  );
};
