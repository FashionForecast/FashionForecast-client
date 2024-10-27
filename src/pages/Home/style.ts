import styled from '@emotion/styled';

const HomeWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

const WeatherWrap = styled.div`
  flex-grow: 1;
  padding: 16px 16px 72px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
  border-top: 1px solid ${({ theme }) => theme.colors.elevation.outlined};
`;

export const S = { WeatherWrap, HomeWrap };
