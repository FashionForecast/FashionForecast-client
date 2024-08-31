import useAppSelector from '@/hooks/useAppSelector';
import { getWeather } from '@/service/weather';
import { useQuery } from '@tanstack/react-query';
import WeatherCard from './components/weather/WeatherCard';
import Header from './components/Header';
import RecommendClothes from './components/RecommendClothes';
import TimeSelector from './components/TimeSelector';
import { useState } from 'react';
import WeatherTimeLine from './components/WeatherTimeLine';
import { S } from './style';

const Home = () => {
  const currentRegion = useAppSelector((state) => state.currentRegion.value);

  const [selectedDay, setSelectedDay] = useState<string>('오늘');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const handleTimeSelectorSubmit = (
    day: string,
    start: string,
    end: string
  ) => {
    setSelectedDay(day);
    setStartTime(start);
    setEndTime(end);
  };

  const { data, isError } = useQuery({
    queryKey: [
      'weather',
      currentRegion?.region,
      selectedDay,
      startTime,
      endTime,
    ],
    queryFn: () =>
      getWeather(currentRegion?.region, selectedDay, startTime, endTime),
    enabled: !!currentRegion,
  });

  if (isError) return <div>날씨 조회 오류</div>;
  return (
    <S.HomeWrap>
      <Header />

      {data && (
        <RecommendClothes
          weather={{
            extremumTmp: data.data.extremumTmp,
            maxMinTmpDiff: data.data.maxMinTmpDiff,
            maximumPop: data.data.maximumPop,
            maximumPcp: data.data.maximumPcp,
          }}
        />
      )}

      <S.WeatherWrap>
        <WeatherCard
          extremumTmp={data?.data.extremumTmp}
          maximumPop={data?.data.maximumPop}
          maximumPcp={data?.data.maximumPcp}
        />

        {data && <WeatherTimeLine forecasts={data.data.forecasts} />}
      </S.WeatherWrap>

      <TimeSelector onSubmit={handleTimeSelectorSubmit} />
    </S.HomeWrap>
  );
};

export default Home;
