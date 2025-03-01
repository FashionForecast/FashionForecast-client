import styled from '@emotion/styled';
import { Button as MuiButton } from '@mui/material';

type ButtonProps = React.ComponentProps<typeof MuiButton>;

/**
 * - variant - 버튼 유형
 * - color - 색상
 * - size - 크기
 * - loading - 로딩 아이콘 표시
 * - startIcon - 버튼 앞에 위치할 아이콘
 * - 이외의 props - [MuiButton](https://mui.com/material-ui/api/button/)
 */
export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <BaseButton variant='contained' disableElevation {...rest}>
      {children}
    </BaseButton>
  );
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

    &.MuiButton-colorPrimary {
      color: ${({ theme }) => theme.colors.text.primary};
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

    & .MuiTouchRipple-child {
      background-color: ${({ theme }) => theme.colors.white};
    }
  }

  & .MuiButton-startIcon {
    margin: 0;
    margin-right: 4px;
  }
`;
