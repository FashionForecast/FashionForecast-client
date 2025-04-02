import {
  WEATHER_COLORS,
  WEATHER_LABELS,
  WeatherTypeName,
} from '@/entities/weather';

import { S } from './WeatherHeadline.style';

type WeatherHeadlineProps = {
  weatherType: WeatherTypeName;
};

export const WeatherHeadline = ({ weatherType }: WeatherHeadlineProps) => {
  const { temperature, summary } = WEATHER_LABELS[weatherType];
  const { deep, main } = WEATHER_COLORS[weatherType];

  return (
    <S.HeadlineWrap>
      <S.Headline $color={main}>
        <S.Temperature $color={deep}>{temperature}</S.Temperature>
        <S.Summary>{summary}</S.Summary>
      </S.Headline>
    </S.HeadlineWrap>
  );
};
