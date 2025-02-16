import styled from '@emotion/styled';
import { IconButton } from '@mui/material';

import { ArrowIcon } from '../icon/ArrowIcon';

type GoBackButtonProps = {
  onClick?: () => void;
};

export const GoBackButton = ({ onClick }: GoBackButtonProps) => {
  return (
    <GoBackButtonBase size='large' onClick={onClick}>
      <ArrowIcon />
    </GoBackButtonBase>
  );
};

const GoBackButtonBase = styled(IconButton)`
  margin-right: 16px;
`;
