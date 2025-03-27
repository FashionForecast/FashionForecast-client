import styled from '@emotion/styled';
import { InputAdornment, TextField as MuiTextFiled } from '@mui/material';

type TextFiledProps = React.ComponentProps<typeof MuiTextFiled>;

type CustomTextFiledProps = Omit<TextFiledProps, 'variant'> & {
  variant?: 'filled';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

/**
 * - value - TextField value
 * - onChange - value 변경 시 실행되는 callback 함수
 * - placeholder - placeholder
 * - variant - 유형
 * - size - 크기
 * - multiline - textarea 태그 렌더링
 * - minRows - multiline 활성화 시, 최소 row 수
 * - leftIcon - 왼쪽 아이콘
 * - rightIcon - 오른쪽 아이콘
 * - 이외의 props - [MuiTextFiled](https://mui.com/material-ui/api/text-field/)
 */
export const TextField = ({
  variant = 'filled',
  leftIcon,
  rightIcon,
  ...rest
}: CustomTextFiledProps) => {
  return (
    <BaseTextFiled
      variant={variant}
      size='medium'
      fullWidth
      spellCheck='false'
      slotProps={{
        input: {
          startAdornment: leftIcon && (
            <InputAdornment position='end'>{leftIcon}</InputAdornment>
          ),
          endAdornment: rightIcon && (
            <InputAdornment position='end'>{rightIcon}</InputAdornment>
          ),
        },
      }}
      {...rest}
    />
  );
};

const BaseTextFiled = styled(MuiTextFiled)`
  & .MuiFilledInput-root {
    padding: 16px;
    background-color: ${({ theme }) => theme.colors.blueGrey[200]};
    border-radius: ${({ theme }) => theme.borderRadius[2]};

    &.Mui-disabled {
      background-color: ${({ theme }) => theme.colors.grey[200]};

      &:hover {
        background-color: ${({ theme }) => theme.colors.grey[200]};
      }
    }

    &.Mui-error {
      border: 2px solid ${({ theme }) => theme.colors.error.main};
    }

    &::before,
    &::after {
      display: none;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: ${({ theme }) => theme.colors.blueGrey[300]};
      }
    }

    & .MuiFilledInput-input {
      padding: 0;
      color: ${({ theme }) => theme.colors.text.primary};
    }

    & .MuiInputAdornment-root {
      margin: 0;

      &:first-of-type {
        margin-right: 8px;
      }

      &:last-of-type {
        margin-left: 8px;
      }
    }
  }
`;
