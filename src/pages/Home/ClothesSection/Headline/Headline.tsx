import { LOOKBOOK_WEATHER_TYPE } from '@/constants/Lookbook/data';
import { S } from './Headline.style';
import { WeatherType } from '@/types/weather';
import { memo } from 'react';

type HeadlineProps = {
  weatherType: WeatherType;
};

const Headline = ({ weatherType }: HeadlineProps) => {
  return (
    <S.HeadlineWrap>
      <h6>{LOOKBOOK_WEATHER_TYPE[weatherType].title}</h6>
      <span>{LOOKBOOK_WEATHER_TYPE[weatherType].subtitle}</span>
    </S.HeadlineWrap>
  );
};

export default memo(Headline);
