import CustomTextField from '@/components/CustomMui/CustomTextField';
import styled from '@emotion/styled';

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 8px 16px;

  & h6 {
    ${({ theme }) => theme.typo.h6}
  }
`;

const Section = styled.section`
  ${({ theme }) => theme.typo['body-2']}
  padding: 16px;

  p {
    margin-bottom: 16px;
  }
`;

const TextField = styled(CustomTextField)`
  & .MuiFilledInput-root {
    padding-top: 8px;
  }
`;

export const S = {
  Header,
  Section,
};

export const C = {
  TextField,
};
