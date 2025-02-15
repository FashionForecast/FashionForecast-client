import { useAppSelector } from '@/shared/lib/useAppSelector';
import MenuItem from '../components/MenuItem/MenuItem';
import { UserFillIcon } from '@/shared/ui';
import { MemberDto } from '@/entities/member/model/types';

const GenderMenu = () => {
  const user = useAppSelector((state) => state.member.info);
  const gender = getGender(user?.gender);

  return (
    <MenuItem
      title='성별'
      value={gender}
      icon={<UserFillIcon />}
      dividerThick
    />
  );
};

export default GenderMenu;

function getGender(gender?: MemberDto['gender']) {
  if (!gender) return '-';

  if (gender === 'MALE') return '남성';
  else return '여성';
}
