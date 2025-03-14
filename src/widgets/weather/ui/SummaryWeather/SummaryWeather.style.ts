import styled from '@emotion/styled';

const SummaryWeatherWrap = styled.article`
  padding: 16px 16px 12px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h6`
  ${({ theme }) => theme.typo['subtitle-1']}
  color: ${({ theme }) => theme.colors.primary.dark}
`;

const IconGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const WeatherIconWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconLabel = styled.span`
  ${({ theme }) => theme.typo['body-2']}
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const DialogContentList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Description = styled.p`
  display: flex;

  &::before {
    margin: 0 8px;
    font-size: 16px;
    font-weight: 700;
    content: '·';
  }
`;

export const S = {
  SummaryWeatherWrap,
  Header,
  Title,
  IconGroup,
  WeatherIconWrap,
  IconLabel,
  DialogContentList,
  Description,
};
