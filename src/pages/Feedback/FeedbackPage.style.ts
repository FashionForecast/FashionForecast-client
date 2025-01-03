import CustomTextField from '@/components/CustomMui/CustomTextField';
import styled from '@emotion/styled';

const FeedbackWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100dvh;
  padding: 0 16px 16px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 8px 0;

  & h6 {
    ${({ theme }) => theme.typo.h6}
  }
`;

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
  FeedbackWrap,
  Header,
  Section,
};

export const C = {
  TextField,
};
