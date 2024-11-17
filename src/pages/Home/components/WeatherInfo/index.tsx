import { WeatherResponseData } from '@/types/weather';
import WeatherCard from './WeatherCard';
import WeatherTimeLine from './WeatherTimeLine';
import { S } from './style';
import { memo } from 'react';

type WeatherInfoProps = {
  weather: WeatherResponseData;
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
