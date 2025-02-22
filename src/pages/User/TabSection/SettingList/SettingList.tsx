import { Link } from 'react-router-dom';

import { Button, FeedbackIcon } from '@/shared/ui';

import MenuItem from './components/MenuItem/MenuItem';
import GenderMenu from './GenderMenu/GenderMenu';
import LogoutMenu from './LogoutMenu/LogoutMenu';
import RegionSetMenu from './RegionSetMenu/RegionSetMenu';
import { S } from './SettingList.style';
import ThicknessSetMenu from './ThicknessSetMenu/ThicknessSetMenu';
import TimeSetMenu from './TimeSetMenu/TimeSetMenu';
import WithdrawlButton from './WithdrawlButton/WithdrawlButton';

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
          <Button color='inherit'>이용약관</Button>
        </Link>
        <S.Divider />
        <Link to={'/privacy-policy'}>
          <Button color='inherit'>개인정보처리방침</Button>
        </Link>
      </S.Footer>
    </S.MySettingWrap>
  );
};

export default SettingList;
