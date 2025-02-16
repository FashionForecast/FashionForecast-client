import styled from '@emotion/styled';
import { TextField as MuiTextFiled } from '@mui/material';

type MuiTextFiledProps = React.ComponentProps<typeof MuiTextFiled>;

export const CustomTextField = ({ ...rest }: MuiTextFiledProps) => {
  return <TextFiledBase {...rest} />;
};

const TextFiledBase = styled(MuiTextFiled)`
  & .MuiFilledInput-root {
    background-color: ${({ theme }) => theme.colors.blueGrey.A06};

    &.MuiInputBase-root::before {
      border-bottom-color: ${({ theme }) => theme.colors.blueGrey.A42};
    }

    &::after {
      border-bottom-color: ${({ theme }) => theme.colors.primary.main};
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: ${({ theme }) => theme.colors.blueGrey.A09};
      }
    }
  }

  & input {
    padding: 6px 36px 6px 12px;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;
