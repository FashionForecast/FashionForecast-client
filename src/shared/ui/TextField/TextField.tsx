import styled from '@emotion/styled';
import { InputAdornment, TextField as MuiTextFiled } from '@mui/material';

type TextFiledProps = React.ComponentProps<typeof MuiTextFiled>;

type CustomTextFiledProps = Omit<TextFiledProps, 'variant'> & {
  variant?: 'filled';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

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
