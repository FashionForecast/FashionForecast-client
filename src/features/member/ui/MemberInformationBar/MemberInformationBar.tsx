import { useState } from 'react';

import { MemberAvatar } from '@/entities/member/ui/MemberAvatar/MemberAvatar';

import { useAppSelector } from '@/shared/lib';
import { IconButton, Menu, MoreIcon } from '@/shared/ui';

import { LogoutMenuItem } from './LogoutMenuItem/LogoutMenuItem';
import { S } from './MemberInformationBar.style';
import { WithDrawalMenuItem } from './WithDrawalMenuItem/WithDrawalMenuItem';

export const MemberInformationBar = () => {
  const member = useAppSelector((state) => state.member.info);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpenClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <S.InformationBar>
      <S.Information>
        <MemberAvatar />

        <span>{member?.nickname}</span>
      </S.Information>

      <div>
        <IconButton onClick={handleMenuOpenClick}>
          <MoreIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
          <LogoutMenuItem />
          <WithDrawalMenuItem />
        </Menu>
      </div>
    </S.InformationBar>
  );
};
