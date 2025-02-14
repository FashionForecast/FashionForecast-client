import { S } from './SettingList.style';
import { CustomButton } from '@/shared/ui';
import MenuItem from './components/MenuItem/MenuItem';
import RegionSetMenu from './RegionSetMenu/RegionSetMenu';
import TimeSetMenu from './TimeSetMenu/TimeSetMenu';
import ThicknessSetMenu from './ThicknessSetMenu/ThicknessSetMenu';
import LogoutMenu from './LogoutMenu/LogoutMenu';
import { Link } from 'react-router-dom';
import WithdrawlButton from './WithdrawlButton/WithdrawlButton';
import GenderMenu from './GenderMenu/GenderMenu';
import { FeedbackIcon } from '@/shared/ui';

const SettingList = () => {
  return (
    <S.MySettingWrap>
      <S.ContentWrap>
        <S.Ul>
          <RegionSetMenu />
          <TimeSetMenu />
          <ThicknessSetMenu />
          <GenderMenu />
          <LogoutMenu />
        </S.Ul>

        <S.Ul>
          <Link to={'/feedback'}>
            <MenuItem title='고객의 소리' icon={<FeedbackIcon />} />
          </Link>
        </S.Ul>
      </S.ContentWrap>

      <S.Footer>
        <WithdrawlButton />
        <S.Divider />
        <Link to={'/terms-of-service'}>
          <CustomButton color='inherit'>이용약관</CustomButton>
        </Link>
        <S.Divider />
        <Link to={'/privacy-policy'}>
          <CustomButton color='inherit'>개인정보처리방침</CustomButton>
        </Link>
      </S.Footer>
    </S.MySettingWrap>
  );
};

export default SettingList;
