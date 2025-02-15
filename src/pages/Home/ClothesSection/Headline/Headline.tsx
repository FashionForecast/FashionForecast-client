import { LOOKBOOK_WEATHER_TYPE } from '@/shared/consts';
import { S } from './Headline.style';
import { memo } from 'react';
import { WeatherType } from '@/shared/types';

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
