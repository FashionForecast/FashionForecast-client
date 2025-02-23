import styled from '@emotion/styled';

import { useAppSelector } from '@/shared/lib';

import { UserIcon } from '../icon/UserIcon';

export const UserAvatar = () => {
  const member = useAppSelector((state) => state.member.info);

  return member?.imageUrl ? (
    <UserImage src={member.imageUrl} alt={`${member.nickname}님의 이미지`} />
  ) : (
    <UserIcon />
  );
};

const UserImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 50%;
`;
