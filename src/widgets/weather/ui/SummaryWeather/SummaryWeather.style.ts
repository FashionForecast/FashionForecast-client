import styled from '@emotion/styled';

const SummaryWeatherWrap = styled.article`
  padding: 16px;
`;

const IconGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 4px;
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

const DialogContentDescription = styled.p`
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
  IconGroup,
  WeatherIconWrap,
  IconLabel,
  DialogContentList,
  DialogContentDescription,
};
