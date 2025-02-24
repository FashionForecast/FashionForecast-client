import { memo } from 'react';

import { WeatherDto } from '@/entities/weather';

import WeatherCard from './WeatherCard/WeatherCard';
import { S } from './WeatherInfomation.style';
import WeatherTimeLine from './WeatherTimeLine/WeatherTimeLine';

type WeatherInfoProps = {
  weather: WeatherDto;
};

export const WeatherInformation = memo(({ weather }: WeatherInfoProps) => {
  return (
    <S.WeatherInfoWrap>
      <WeatherCard
        extremumTmp={weather.extremumTmp}
        maximumPop={weather.maximumPop}
        maximumPcp={weather.maximumPcp}
      />

      <WeatherTimeLine forecasts={weather.forecasts} />
    </S.WeatherInfoWrap>
  );
});
