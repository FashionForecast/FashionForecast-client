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
import { KSTDate } from '@/utils/date';

export type SelectedTime = {
  day: '오늘' | '내일';
  start: string;
  end: string;
};

const TIMES = Array.from({ length: 24 }, (_, i) => {
  const AMPM = i < 12 ? '오전' : '오후';
  let hour = i.toString().padStart(2, '0');

  if (i >= 13) hour = (i - 12).toString().padStart(2, '0');

  return `${AMPM} ${hour}시`;
});

const Home = () => {
  const currentRegion = useAppSelector((state) => state.currentRegion.value);
  const [selectedTime, setSelectedTime] = useState<SelectedTime>({
    day: '오늘',
    start: defaultTime('start'),
    end: defaultTime('end'),
  });

  const handleSelectedTime = (key: keyof SelectedTime, value: string) => {
    if (value === '오늘') {
      setSelectedTime({
        day: '오늘',
        start: defaultTime('start'),
        end: defaultTime('end'),
      });

      return;
    }

    setSelectedTime((prev) => ({ ...prev, [key]: value }));
  };

  const { data, isError } = useQuery({
    queryKey: ['weather', currentRegion?.region],
    queryFn: () => getWeather(selectedTime, currentRegion!.region),
    enabled: !!currentRegion,
  });

  return (
    <S.HomeWrap>
      <Header />
      {isError && <div>날씨 조회 오류</div>}
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

      {selectedTime && (
        <TimeSelector
          selectedTime={selectedTime}
          handleSelectedTime={handleSelectedTime}
        />
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

  return TIMES[hour];
}
