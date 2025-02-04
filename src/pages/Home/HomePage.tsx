import useAppSelector from '@/hooks/useAppSelector';
import { getWeather } from '@/services/weather';
import { useQuery } from '@tanstack/react-query';
import MainHeader from './MainHeader/MainHeader';
import ClothesSection from './ClothesSection/ClothesSection';
import { useEffect, useState } from 'react';
import { S } from './HomePage.style';
import { TIME_LIST } from '@/constants/timeList';
import HomeLoading from './HomeLoading';
import NetworkError from '@/components/NetworkError/NetworkError';
import HeadHelmet from '@/components/HeadHelmet/HeadHelmet';
import WeatherInfo from './WeatherInfo/WeatherInfo';
import TimeSelector, {
  DayButtonType,
  Time,
} from '@/components/TimeSelector/TimeSelector';
import { useLocation, useSearchParams } from 'react-router-dom';

export type SelectedTime = {
  day: '오늘' | '내일';
  start: string;
  end: string;
};

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation(); // 현재 URL 정보 가져오기
  const geolocation = useAppSelector((state) => state.geolocation.value);
  const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState(false);
  const [times, setTimes] = useState<Time[]>(getTimes);
  const [day, setDay] = useState<DayButtonType>('오늘');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['weather', geolocation?.region],
    queryFn: () => getWeather(times, day, geolocation!.region),
    enabled: !!geolocation,
  });

  const toggleTimeSelector = () => {
    setIsTimeSelectorOpen((prev) => !prev);
    setSearchParams({ time: isTimeSelectorOpen ? 'close' : 'open' });
  };

  useEffect(() => {
    const timeParameter = searchParams.get('time');

    if (timeParameter === null) {
      setIsTimeSelectorOpen(false);
      return;
    }

    setIsTimeSelectorOpen(timeParameter === 'open' ? true : false);
  }, [isTimeSelectorOpen, searchParams, location.search]);

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
            <button type='button' onClick={toggleTimeSelector}>
              외출시간 변경하기
            </button>

            <WeatherInfo weather={data} />
          </>
        )}

        <TimeSelector
          isOpen={isTimeSelectorOpen}
          times={times}
          setTimes={setTimes}
          day={day}
          setDay={setDay}
          closeTimeSelector={toggleTimeSelector}
        />
      </S.HomeWrap>
    </>
  );
};

export default HomePage;

// const defaultSelectedTime: SelectedTime = {
//   day: '오늘',
//   start: defaultTime('start'),
//   end: defaultTime('end'),
// };

// function defaultTime(type: 'start' | 'end') {
//   const KST = KSTDate();
//   let hour = KST.getHours();

//   if (type === 'end') {
//     if (hour + 8 >= 24) hour = 23;
//     else hour = hour + 8;
//   }

//   return TIME_LIST[hour];
// }

/**
 * @example
 * 오전 00시 → return 0
 * 오전 03시 → return 3
 * 오후 12시 → return 12
 * 오후 03시 → return 15
 */
// function getHour(time: string) {
//   const [AMPM, userTime] = time.split(' ');
//   let hour = Number(userTime.replace(/\D/g, ''));

//   if (AMPM === '오후') {
//     if (hour === 12) return hour;
//     else hour = 12 + hour;
//   }

//   return hour;
// }

// function getSelectedTime(user: Member | null): SelectedTime {
//   if (!user || user.outingStartTime === 'DEFAULT') {
//     return defaultSelectedTime;
//   }

//   const { outingStartTime, outingEndTime } = user;
//   const userStartHour = getHour(outingStartTime);
//   const userEndHour = getHour(outingEndTime);
//   const currentHour = KSTDate().getHours();

//   let day: SelectedTime['day'] = '오늘';
//   let start = outingStartTime;
//   const end = outingEndTime;

//   if (currentHour > userStartHour && currentHour <= userEndHour) {
//     start = TIME_LIST[currentHour];
//   }

//   if (currentHour > userEndHour) {
//     day = '내일';
//   }

//   return { day, start, end };
// }

function getTimes() {
  const now = new Date();
  const startHour = now.getHours();
  const endHour = (startHour + 8) % 24;
  const isTomorrow = endHour < startHour;
  const newTime = {
    startTime: TIME_LIST[startHour],
    endTime: TIME_LIST[endHour],
    indexes: Array.from({ length: 9 }, (_, i) => (startHour + i) % 24),
    isTomorrow,
    isDefault: true,
  };

  return [newTime];
}
