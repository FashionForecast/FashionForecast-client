import styled from '@emotion/styled';

const WeatherInfoWrap = styled.div`
  flex-grow: 1;
  padding: 16px 16px 72px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
  border-top: 1px solid ${({ theme }) => theme.colors.elevation.outlined};
`;

export const S = { WeatherInfoWrap };
