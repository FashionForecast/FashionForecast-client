import useAppSelector from '@/hooks/useAppSelector';
import { getWeatherData } from '@/services/weather';
import { useQuery } from '@tanstack/react-query';
import MainHeader from './MainHeader/MainHeader';
import ClothesSection from './ClothesSection/ClothesSection';
import TimeSelector from './TimeSelector/TimeSelector';
import { useCallback, useState } from 'react';
import { S } from './HomePage.style';
import { KSTDate } from '@/utils/date';
import { TIME_LIST } from '@/constants/timeList';
import HomeLoading from './HomeLoading';
import NetworkError from '@/components/NetworkError/NetworkError';
import { Member } from '@/types/member';
import HeadHelmet from '@/components/HeadHelmet/HeadHelmet';
import WeatherInfo from './WeatherInfo/WeatherInfo';

export type SelectedTime = {
  day: '오늘' | '내일';
  start: string;
  end: string;
};

const HomePage = () => {
  const geolocation = useAppSelector((state) => state.geolocation.value);
  const user = useAppSelector((state) => state.user.info);
  const [selectedTime, setSelectedTime] = useState<SelectedTime>(() =>
    getSelectedTime(user)
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['weather', geolocation?.region],
    queryFn: () => getWeatherData(selectedTime, geolocation!.region),
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

export default HomePage;

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

function getSelectedTime(user: Member | null): SelectedTime {
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
