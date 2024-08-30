import useAppSelector from '@/hooks/useAppSelector';
import { getWeather } from '@/service/weather';
import { useQuery } from '@tanstack/react-query';
import WeatherCard from './components/weather/WeatherCard';
import Header from './components/Header';
import RecommendClothes from './components/RecommendClothes';
import TimeSelector from './components/TimeSelector';
import { useState } from 'react';

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

  return (
    <div>
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

      {isError && <span>날씨를 조회하지 못함</span>}
      {data?.data.forecasts.map((v, i) => (
        <div key={i}>
          <span>
            날짜: {v.fcstDate}, 시간: {v.fcstTime} 온도: {v.tmp} 강수확률:
            {v.pop} 강수량: {v.pcp}
          </span>
        </div>
      ))}

      <WeatherCard
        extremumTmp={data?.data.extremumTmp}
        maximumPop={data?.data.maximumPop}
        maximumPcp={data?.data.maximumPcp}
      />
      <TimeSelector onSubmit={handleTimeSelectorSubmit} />
    </div>
  );
};

export default Home;
