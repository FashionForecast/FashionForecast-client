import useAppSelector from '@/hooks/useAppSelector';
import MenuItem from '../components/MenuItem/MenuItem';
import { Member } from '@/types/member';
import UserFillIcon from '@/components/icon/UserFillIcon';

const GenderMenu = () => {
  const user = useAppSelector((state) => state.user.info);
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
