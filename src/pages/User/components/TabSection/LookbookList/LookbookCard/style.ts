import { LOOKBOOK_WEATHER_TYPE } from '@/constants/Lookbook/data';
import { WeatherType } from '@/types/weather';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const LookbookCardWrap = styled.li<{ $color: WeatherType }>`
  padding: 12px 16px;
  margin: 0 16px 8px;
  background-color: ${({ $color }) => LOOKBOOK_WEATHER_TYPE[$color].color};
  border-radius: 16px;
`;

const CardHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleWrap = styled.div`
  & h6 {
    ${({ theme }) => theme.typo['subtitle-1']}
  }

  & span {
    ${({ theme }) => theme.typo['body-2']} /* margin-right: 16px; */
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
  max-width: 64px;
`;

const Top = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  height: 64px;
`;

const LookbookLink = styled(Link)`
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-8px);
  }
`;

export const S = {
  LookbookCardWrap,
  CardHeader,
  TitleWrap,
  ClothesList,
  ClothesItem,
  Top,
};

export const C = { IconBtn, LookbookLink };
