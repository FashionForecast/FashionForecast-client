import UserFillIcon from '@/assets/svg/userFill.svg?react';
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

const MySetting = () => {
  return (
    <S.MySettingWrap>
      <S.ContentWrap>
        <S.Ul>
          <RegionSetMenu />
          <TimeSetMenu />
          <ThicknessSetMenu />
          <MenuItem
            title='성별'
            value='남성'
            icon={<UserFillIcon />}
            dividerThick
          />
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
        <CustomButton color='inherit'>이용약관</CustomButton>
        <S.Divider />
        <CustomButton color='inherit'>개인정보처리방침</CustomButton>
      </S.Footer>
    </S.MySettingWrap>
  );
};

export default MySetting;
