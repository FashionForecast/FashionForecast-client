import styled from '@emotion/styled';

import { CustomTextField } from '@/shared/ui';

const Section = styled.section`
  ${({ theme }) => theme.typo['body-2']}
  flex-grow: 1;
  padding: 16px 0;

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
  Section,
};

export const C = {
  TextField,
};
