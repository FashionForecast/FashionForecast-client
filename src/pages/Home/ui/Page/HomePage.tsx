import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { FetchError } from '@/widgets/error';
import { DayButtonType, Time, TimeSelector } from '@/widgets/TimeSelector/';

import { getWeather } from '@/entities/weather/api/weather';

import { paddedTimeList } from '@/shared/consts/timeList';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import { HeadHelmet } from '@/shared/ui';

import ClothesSection from '../../ClothesSection/ClothesSection';
import HomeLoading from '../../HomeLoading';
import MainHeader from '../../MainHeader/MainHeader';
import WeatherInfo from '../../WeatherInfo/WeatherInfo';

import { S } from './HomePage.style';

export type SelectedTime = {
  day: '오늘' | '내일';
  start: string;
  end: string;
};

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
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

  const handleTimeSubmit = () => {
    queryClient.invalidateQueries({ queryKey: ['weather'] });
    toggleTimeSelector();
  };

  const toggleTimeSelector = () => {
    const isOpen = isTimeSelectorOpen;
    setIsTimeSelectorOpen(!isOpen);
    setSearchParams({ time: isOpen ? 'close' : 'open' });

    document.body.style.overflow = isOpen ? '' : 'hidden';
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
        {isError && <FetchError handleRefetch={refetch} />}
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
          onSubmit={handleTimeSubmit}
        />
      </S.HomeWrap>
    </>
  );
};

function getTimes() {
  const now = new Date();
  const startHour = now.getHours();
  const endHour = (startHour + 8) % 24;
  const isTomorrow = endHour < startHour;
  const newTime = {
    startTime: paddedTimeList[startHour],
    endTime: paddedTimeList[endHour],
    indexes: Array.from({ length: 9 }, (_, i) => (startHour + i) % 24),
    isTomorrow,
    isDefault: true,
  };

  return [newTime];
}
