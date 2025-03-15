import { memo } from 'react';

import { Footer } from '@/widgets/Footer';
import { SummaryWeather, WeatherTimeLine } from '@/widgets/weather';

import { WeatherDto } from '@/entities/weather';

import { S } from './WeatherInformation.style';

type WeatherInfoProps = {
  weather: WeatherDto;
};

export const WeatherInformation = memo(({ weather }: WeatherInfoProps) => {
  return (
    <S.WeatherInfoWrap>
      <SummaryWeather
        temperature={weather.extremumTmp}
        pop={weather.maximumPop}
        pcp={weather.maximumPcp}
      />

      <WeatherTimeLine forecasts={weather.forecasts} />

      <Footer />
    </S.WeatherInfoWrap>
  );
});
