import useAppSelector from '@/hooks/useAppSelector';
import { getWeather } from '@/services/weather';
import { useQuery } from '@tanstack/react-query';
import MainHeader from './components/MainHeader';
import ClothesSection from './components/ClothesSection';
import TimeSelector from './components/TimeSelector';
import { useCallback, useState } from 'react';
import { S } from './style';
import { KSTDate } from '@/utils/date';
import { TIME_LIST } from '@/constants/timeSelector/data';
import HomeLoading from './loading';
import NetworkError from '@/components/NetworkError';
import { User } from '@/types/user';
import HeadHelmet from '@/components/HeadHelmet';
import WeatherInfo from './components/WeatherInfo';

export type SelectedTime = {
  day: '오늘' | '내일';
  start: string;
  end: string;
};

const Home = () => {
  const geolocation = useAppSelector((state) => state.geolocation.value);
  const user = useAppSelector((state) => state.user.info);
  const [selectedTime, setSelectedTime] = useState<SelectedTime>(() =>
    getSelectedTime(user)
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['weather', geolocation?.region],
    queryFn: () => getWeather(selectedTime, geolocation!.region),
    enabled: !!geolocation,
  });

  const updateSelectedTime = useCallback(
    (key: keyof SelectedTime, value: SelectedTime[keyof SelectedTime]) => {
      if ((value as SelectedTime['day']) === '오늘') {
        setSelectedTime(defaultSelectedTime);
        return;
      }

      setSelectedTime((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  return (
    <>
      <HeadHelmet />

      <S.HomeWrap>
        <MainHeader />

        {isError && <NetworkError handleRefetch={refetch} />}
        {isLoading && <HomeLoading />}

        {data && (
          <>
            <ClothesSection weather={data} />

            <WeatherInfo weather={data} />

            <TimeSelector
              selectedTime={selectedTime}
              updateSelectedTime={updateSelectedTime}
            />
          </>
        )}
      </S.HomeWrap>
    </>
  );
};

export default Home;

const defaultSelectedTime: SelectedTime = {
  day: '오늘',
  start: defaultTime('start'),
  end: defaultTime('end'),
};

function defaultTime(type: 'start' | 'end') {
  const KST = KSTDate();
  let hour = KST.getHours();

  if (type === 'end') {
    if (hour + 8 >= 24) hour = 23;
    else hour = hour + 8;
  }

  return TIME_LIST[hour];
}

/**
 * @example
 * 오전 00시 → return 0
 * 오전 03시 → return 3
 * 오후 12시 → return 12
 * 오후 03시 → return 15
 */
function getHour(time: string) {
  const [AMPM, userTime] = time.split(' ');
  let hour = Number(userTime.replace(/\D/g, ''));

  if (AMPM === '오후') {
    if (hour === 12) return hour;
    else hour = 12 + hour;
  }

  return hour;
}

function getSelectedTime(user: User | null): SelectedTime {
  if (!user || user.outingStartTime === 'DEFAULT') {
    return defaultSelectedTime;
  }

  const { outingStartTime, outingEndTime } = user;
  const userStartHour = getHour(outingStartTime);
  const userEndHour = getHour(outingEndTime);
  const currentHour = KSTDate().getHours();

  let day: SelectedTime['day'] = '오늘';
  let start = outingStartTime;
  const end = outingEndTime;

  if (currentHour > userStartHour && currentHour <= userEndHour) {
    start = TIME_LIST[currentHour];
  }

  if (currentHour > userEndHour) {
    day = '내일';
  }

  return { day, start, end };
}
