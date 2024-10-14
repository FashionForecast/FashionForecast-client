import styled from '@emotion/styled';
import { WeatherType } from '.';
import { IconButton } from '@mui/material';

const LookbookCardWrap = styled.li<{ $color: WeatherType }>`
  padding: 12px 16px;
  margin: 0 16px 8px;
  background-color: ${({ $color }) => lookbookColorByWeather[$color]};
  border-radius: 16px;
`;

const CardHeader = styled.header`
  display: flex;
  align-items: center;

  & > span {
    ${({ theme }) => theme.typo['subtitle-1']}
    margin-right: 16px;
  }

  & h3 {
    ${({ theme }) => theme.typo['body-2']}
    flex-grow: 1;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const IconBtn = styled(IconButton)`
  width: 34px;
  height: 34px;
`;

const ClothesList = styled.ol`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const ClothesItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Top = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  height: 64px;
`;

export const S = {
  LookbookCardWrap,
  CardHeader,
  ClothesList,
  ClothesItem,
  Top,
};

export const C = { IconBtn };

const lookbookColorByWeather = {
  '1': '#FFC8C0',
  '2': '#FFCA98',
  '3': '#F2D41B',
  '4': '#CAE02A',
  '5': '#7FEB90',
  '6': '#68E7E8',
  '7': '#B4D8FF',
  '8': '#D4D0FD',
};
