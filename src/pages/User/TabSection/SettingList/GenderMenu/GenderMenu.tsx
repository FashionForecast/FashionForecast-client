import { useAppSelector } from '@/shared/lib/useAppSelector';
import MenuItem from '../components/MenuItem/MenuItem';
import { Member } from '@/shared/types/member';
import { UserFillIcon } from '@/shared/ui';

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

function getGender(gender?: Member['gender']) {
  if (!gender) return '-';

  if (gender === 'MALE') return '남성';
  else return '여성';
}
