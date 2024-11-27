import { WeatherData } from '@/types/weather';
import WeatherCard from './WeatherCard/WeatherCard';
import WeatherTimeLine from './WeatherTimeLine/WeatherTimeLine';
import { S } from './WeatherInfo.style';
import { memo } from 'react';

type WeatherInfoProps = {
  weather: WeatherData;
};

const WeatherInfo = ({ weather }: WeatherInfoProps) => {
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
};

export default memo(WeatherInfo);
