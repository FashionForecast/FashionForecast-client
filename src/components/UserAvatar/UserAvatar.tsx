import { Avatar as MuiAvatar, IconButton } from '@mui/material';
import styled from '@emotion/styled';
import DefaultAvatarIcon from '../icon/DefaultAvatarIcon';

type UserAvatarProps = {
  imageUrl?: string | null;
};

const UserAvatar = ({ imageUrl }: UserAvatarProps) => {
  return (
    <IconButton>
      {imageUrl ? (
        <ImageAvatar src={imageUrl} alt='사용자 이미지' />
      ) : (
        <DefaultAvatarIcon />
      )}
    </IconButton>
  );
};

export default UserAvatar;

const ImageAvatar = styled(MuiAvatar)`
  width: 24px;
  height: 24px;
`;
