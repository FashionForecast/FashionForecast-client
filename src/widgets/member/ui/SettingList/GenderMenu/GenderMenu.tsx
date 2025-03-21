import { SetCard } from '@/entities/member';
import { MemberDto } from '@/entities/member/model/types';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { PeopleIcon } from '@/shared/ui';

const GenderMenu = () => {
  const member = useAppSelector((state) => state.member.info);
  const gender = getGender(member?.gender);

  return (
    <SetCard
      icon={<PeopleIcon />}
      title='성별'
      value={gender}
      disabled
      bottomBorder={false}
    />
  );
};

export default GenderMenu;

function getGender(gender?: MemberDto['gender']) {
  if (gender === 'MALE') return '남성';
  else if (gender === 'FEMALE') return '여성';

  return '-';
}
