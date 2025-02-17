import styled from '@emotion/styled';
import { Button as MuiButton } from '@mui/material';

type ButtonProps = React.ComponentProps<typeof MuiButton>;

export const Button = ({ ...rest }: ButtonProps) => {
  return <BaseButton variant='contained' disableElevation {...rest} />;
};

const BaseButton = styled(MuiButton)`
  border-radius: 100px;

  &.MuiButton-sizeLarge {
    height: 40px;
    padding: 8px 12px;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.46px;
  }

  &.MuiButton-sizeMedium {
    height: 32px;
    padding: 4px 12px;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.4px;
  }

  &.MuiButton-sizeSmall {
    height: 24px;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.46px;
  }

  &.MuiButton-outlined {
    background-color: ${({ theme }) => theme.colors.secondary.main};
    border: none;

    & .MuiTouchRipple-child {
      background-color: ${({ theme }) => theme.colors.white};
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: ${({ theme }) => theme.colors.secondary.dark};
      }
    }
  }
`;
