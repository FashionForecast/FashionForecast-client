import styled from '@emotion/styled';

import { useAppSelector } from '@/shared/lib';
import { UserIcon } from '@/shared/ui';

export const MemberAvatar = () => {
  const member = useAppSelector((state) => state.member.info);

  return member?.imageUrl ? (
    <MemberImage src={member.imageUrl} alt={`${member.nickname}님의 이미지`} />
  ) : (
    <UserIcon />
  );
};

const MemberImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 50%;
`;
