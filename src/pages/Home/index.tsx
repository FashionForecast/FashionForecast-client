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
import { dateToISO, KSTDate } from '@/utils/date';

export type SelectedTime = {
  day: '오늘' | '내일';
  start: string;
  end: string;
};

const Home = () => {
  const currentRegion = useAppSelector((state) => state.currentRegion.value);
  const [selectedTime, setSelectedTime] = useState<SelectedTime>({
    day: '오늘',
    start: setDefaultTime(),
    end: setDefaultTime('end'),
  });

  const { data, isError } = useQuery({
    queryKey: ['weather', currentRegion?.region, selectedTime],
    queryFn: () => getWeather(selectedTime, currentRegion!.region),
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

      <TimeSelector selectedTime={selectedTime} />
    </S.HomeWrap>
  );
};

export default Home;

function setDefaultTime(type: 'start' | 'end' = 'start') {
  const KST = KSTDate();

  if (type === 'end') {
    const hour = KST.getHours();

    if (hour + 8 >= 24) KST.setHours(23);
    else KST.setHours(hour + 8);
  }

  KST.setMinutes(0);
  KST.setSeconds(0);
  KST.setMilliseconds(0);

  return dateToISO(KST);
}
