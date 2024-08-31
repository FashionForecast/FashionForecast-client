import styled from '@emotion/styled';

const WeatherWrap = styled.div`
  padding: 16px 16px 72px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
  border-top: 1px solid ${({ theme }) => theme.colors.elevation.outlined};
`;

export const S = { WeatherWrap };
