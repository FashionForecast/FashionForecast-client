import { LOOKBOOK_WEATHER_TYPE } from '@/constants/Lookbook/data';
import { WeatherType } from '@/types/weather';
import styled from '@emotion/styled';

const Headline = styled.div<{ $type: WeatherType }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin: 0 16px 8px;
  background-color: ${({ $type }) => LOOKBOOK_WEATHER_TYPE[$type].color};
  border-radius: 12px;

  & h6 {
    ${({ theme }) => theme.typo['subtitle-1']}
    margin-right: 16px;
  }

  & span {
    ${({ theme }) => theme.typo['body-2']}
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const S = {
  Headline,
};
