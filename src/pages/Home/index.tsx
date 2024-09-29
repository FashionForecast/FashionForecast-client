import useAppSelector from '@/hooks/useAppSelector';
import { getWeather } from '@/service/weather';
import { useQuery } from '@tanstack/react-query';
import WeatherCard from './components/WeatherCard';
import Header from './components/Header';
import RecommendClothes from './components/RecommendClothes';
import TimeSelector from './components/TimeSelector';
import { useState } from 'react';
import WeatherTimeLine from './components/WeatherTimeLine';
import { S } from './style';
import { KSTDate } from '@/utils/date';
import { TIME_LIST } from '@/constants/timeSelector/data';
import HomeLoading from './loading';

export type SelectedTime = {
  day: '오늘' | '내일';
  start: string;
  end: string;
};

const defaultSelectedTime: SelectedTime = {
  day: '오늘',
  start: defaultTime('start'),
  end: defaultTime('end'),
};

const Home = () => {
  const geolocation = useAppSelector((state) => state.geolocation.value);
  const [selectedTime, setSelectedTime] =
    useState<SelectedTime>(defaultSelectedTime);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['weather', geolocation?.region],
    queryFn: () => getWeather(selectedTime, geolocation!.region),
    enabled: !!geolocation,
  });

  const updateSelectedTime = (
    key: keyof SelectedTime,
    value: SelectedTime[keyof SelectedTime]
  ) => {
    if ((value as SelectedTime['day']) === '오늘') {
      setSelectedTime(defaultSelectedTime);
      return;
    }

    setSelectedTime((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <S.HomeWrap>
      <Header />

      {isError && <div>날씨 조회 오류</div>}

      {isLoading && <HomeLoading />}
      {data && (
        <>
          <RecommendClothes
            weather={{
              extremumTmp: data.extremumTmp,
              maxMinTmpDiff: data.maxMinTmpDiff,
              maximumPop: data.maximumPop,
              maximumPcp: data.maximumPcp,
            }}
          />

          <S.WeatherWrap>
            <WeatherCard
              extremumTmp={data.extremumTmp}
              maximumPop={data.maximumPop}
              maximumPcp={data.maximumPcp}
            />

            <WeatherTimeLine forecasts={data.forecasts} />
          </S.WeatherWrap>

          <TimeSelector
            selectedTime={selectedTime}
            updateSelectedTime={updateSelectedTime}
          />
        </>
      )}
    </S.HomeWrap>
  );
};

export default Home;

function defaultTime(type: 'start' | 'end') {
  const KST = KSTDate();
  let hour = KST.getHours();

  if (type === 'end') {
    if (hour + 8 >= 24) hour = 23;
    else hour = hour + 8;
  }

  return TIME_LIST[hour];
}
