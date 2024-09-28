import styled from '@emotion/styled';
import ArrowIcon from '@/assets/svg/arrow.svg?react';
import { IconButton } from '@mui/material';

const GoBackButton = () => {
  return (
    <GoBackButtonBase size='large'>
      <ArrowIcon />
    </GoBackButtonBase>
  );
};

export default GoBackButton;

const GoBackButtonBase = styled(IconButton)`
  margin-right: 16px;
`;
