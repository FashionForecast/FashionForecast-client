import { Avatar as MuiAvatar, IconButton } from '@mui/material';
import AccountIcon from '@/assets/svg/account.svg?react';
import styled from '@emotion/styled';

type UserAvatarProps = {
  imageUrl?: string | null;
};

const UserAvatar = ({ imageUrl }: UserAvatarProps) => {
  return (
    <IconButton>
      {imageUrl ? (
        <Avatar src={imageUrl} alt='사용자 이미지' />
      ) : (
        <AccountIcon />
      )}
    </IconButton>
  );
};

export default UserAvatar;

const Avatar = styled(MuiAvatar)`
  width: 24px;
  height: 24px;
`;
