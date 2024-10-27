import FeedbackIcon from '@/assets/svg/feedback.svg?react';
import { S } from './style';
import CustomButton from '@/components/CustomMui/CustomButton';
import MenuItem from './MenuItem';
import RegionSetMenu from './RegionSetMenu';
import TimeSetMenu from './TimeSetMenu';
import ThicknessSetMenu from './ThicknessSetMenu';
import LogoutMenu from './LogoutMenu';
import { Link } from 'react-router-dom';
import WithdrawlButton from './WithdrawlButton';
import GenderMenu from './GenderMenu';

const MySetting = () => {
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

export default MySetting;
