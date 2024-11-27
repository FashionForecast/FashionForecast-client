import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import ArrowIcon from '../icon/ArrowIcon';

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
