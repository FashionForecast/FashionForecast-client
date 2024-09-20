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

  const handleSelectedTime = (key: keyof SelectedTime, value: string) => {
    if (key === 'day') {
      if (value === '오늘') {
        setSelectedTime({
          day: '오늘',
          start: setDefaultTime(),
          end: setDefaultTime('end'),
        });
      } else {
        setSelectedTime({
          day: '내일',
          start: setDefaultTime('start', 'tomorrow'),
          end: setDefaultTime('end', 'tomorrow'),
        });
      }

      return;
    }

    const time = convertToTime(selectedTime.day, value);
    setSelectedTime((prev) => ({ ...prev, [key]: time }));
  };

  const { data, isError } = useQuery({
    queryKey: ['weather', currentRegion?.region],
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

      <TimeSelector
        selectedTime={selectedTime}
        handleSelectedTime={handleSelectedTime}
      />
    </S.HomeWrap>
  );
};

export default Home;

function setDefaultTime(
  type: 'start' | 'end' = 'start',
  day: 'today' | 'tomorrow' = 'today'
) {
  const KST = KSTDate();

  if (day === 'tomorrow') {
    const tomorrow = new Date(KST);
    tomorrow.setDate(KST.getDate() + 1);

    if (type === 'start') tomorrow.setHours(0);
    else tomorrow.setHours(23);

    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);

    return dateToISO(tomorrow);
  }

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

function convertToTime(day: SelectedTime['day'], time: string) {
  const KST = KSTDate();
  let hour = parseInt(time.slice(3, 5), 10);
  if (day === '오늘') {
    if (time.includes('오후')) {
      hour = parseInt(time.slice(3, 5), 10) + 12;
    }

    KST.setHours(hour);
    KST.setMinutes(0);
    KST.setSeconds(0);
  }

  return dateToISO(KST);
}
