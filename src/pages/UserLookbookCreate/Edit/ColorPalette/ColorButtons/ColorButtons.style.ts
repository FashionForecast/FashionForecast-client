import styled from '@emotion/styled';

import { forwardPropOption } from '@/shared/lib';
import { CustomButton } from '@/shared/ui';

const ColorButton = styled(CustomButton, forwardPropOption)<{
  $color: string;
}>`
  position: relative;
  min-width: 44px;
  min-height: 42px;
  padding: 0;
  margin: 6px;

  &.MuiButton-colorPrimary {
    background-color: ${({ $color }) => $color};

    &:hover {
      background-color: ${({ $color }) => $color};
    }
  }
`;

const Mark = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const C = { ColorButton };

export const S = { Mark };
