import styled from '@emotion/styled';
import { Button as MuiButton } from '@mui/material';

type ButtonProps = React.ComponentProps<typeof MuiButton>;

export const Button = ({ ...rest }: ButtonProps) => {
  return <BaseButton variant='contained' disableElevation {...rest} />;
};

const BaseButton = styled(MuiButton)`
  border-radius: ${({ theme }) => theme.borderRadius[2]};

  &.MuiButton-sizeLarge {
    height: 40px;
    padding: ${({ theme }) => `${theme.padding['1']} ${theme.padding['1a']}`};
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.46px;
  }

  &.MuiButton-sizeMedium {
    height: 32px;
    padding: ${({ theme }) => `${theme.padding['0a']} ${theme.padding['1a']}`};
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.4px;
  }

  &.MuiButton-sizeSmall {
    height: 24px;
    padding: ${({ theme }) => `${theme.padding[0]} ${theme.padding[1]}`};
    font-size: 12px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.46px;
  }

  &.MuiButton-contained.Mui-disabled {
    background-color: ${({ theme }) => theme.colors.action.disabledBackground};
  }

  &.MuiButton-outlined {
    background-color: ${({ theme }) => theme.colors.secondary.main};
    border: none;

    & .MuiTouchRipple-child {
      background-color: ${({ theme }) => theme.colors.white};
    }

    &.Mui-disabled {
      background-color: transparent;
      border: 1px solid ${({ theme }) => theme.colors.action.disabledBackground};
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: ${({ theme }) => theme.colors.secondary.dark};
      }
    }
  }
`;
