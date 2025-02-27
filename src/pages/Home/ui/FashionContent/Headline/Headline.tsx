import {
  WEATHER_COLORS,
  WEATHER_LABELS,
  WeatherTypeName,
} from '@/entities/weather';
import { WeatherFaceIcon } from '@/entities/weather/ui/WeatherFaceIcon';

import { S } from './Headline.style';

type HeadlineProps = {
  weatherName: WeatherTypeName;
};

export const Headline = ({ weatherName }: HeadlineProps) => {
  return (
    <S.HeadlineWrap $color={WEATHER_COLORS[weatherName]}>
      <WeatherFaceIcon weatherName={weatherName} />

      <h6>{WEATHER_LABELS[weatherName].summary}</h6>
    </S.HeadlineWrap>
  );
};
