import LocationIcon from '@/components/icon/Location';
import ClockIcon from '@/assets/svg/clock.svg?react';
import TshirtIcon from '@/assets/svg/tshirt.svg?react';
import UserFillIcon from '@/assets/svg/userFill.svg?react';
import LogoutIcon from '@/assets/svg/logout.svg?react';
import FeedbackIcon from '@/assets/svg/feedback.svg?react';
import { Icon } from '@mui/material';
import { S } from './style';
import CustomButton from '@/components/CustomMui/CustomButton';

const MySetting = () => {
  return (
    <S.MySettingWrap>
      <S.ContentWrap>
        <S.List>
          <S.ListItem>
            <Icon>
              <LocationIcon />
            </Icon>
            <S.TextWrap>
              <h6>기본 위치</h6>
              <span>현재 위치</span>
            </S.TextWrap>
          </S.ListItem>
          <S.ListItem>
            <Icon>
              <ClockIcon />
            </Icon>
            <S.TextWrap>
              <h6>기본 외출시간</h6>
              <span>오늘 오전 08시 - 오후 07시</span>
            </S.TextWrap>
          </S.ListItem>
          <S.ListItem>
            <Icon>
              <TshirtIcon />
            </Icon>
            <S.TextWrap>
              <h6>기본 옷차림 두께</h6>
              <span>적당하게</span>
            </S.TextWrap>
          </S.ListItem>
          <S.ListItem className='divider-thick'>
            <Icon>
              <UserFillIcon />
            </Icon>
            <S.TextWrap>
              <h6>성별</h6>
              <span>남성</span>
            </S.TextWrap>
          </S.ListItem>
          <S.ListItem>
            <Icon>
              <LogoutIcon />
            </Icon>
            <S.TextWrap>
              <h6>로그아웃</h6>
            </S.TextWrap>
          </S.ListItem>
        </S.List>

        <S.List>
          <S.ListItem>
            <Icon>
              <FeedbackIcon />
            </Icon>
            <S.TextWrap>
              <h6>고객의 소리</h6>
            </S.TextWrap>
          </S.ListItem>
        </S.List>
      </S.ContentWrap>

      <S.Footer>
        <CustomButton color='inherit'>회원탈퇴</CustomButton>
        <S.Divder />
        <CustomButton color='inherit'>이용약관</CustomButton>
        <S.Divder />
        <CustomButton color='inherit'>개인정보처리방침</CustomButton>
      </S.Footer>
    </S.MySettingWrap>
  );
};

export default MySetting;
