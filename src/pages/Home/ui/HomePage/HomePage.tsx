import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { FetchError } from '@/widgets/error';
import { DayButtonType, Time, TimeSelector } from '@/widgets/TimeSelector/';

import { getWeather } from '@/entities/weather/api/weather';

import { paddedTimeList } from '@/shared/consts/timeList';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import { HeadHelmet, Tabs } from '@/shared/ui';

import HomeLoading from '../../HomeLoading';
import { HomeTab } from '../../model/types';
import { FashionContent } from '../FashionContent/FashionContent';
import { HomeHeader } from '../HomeHeader/HomeHeader';
import { WeatherInformation } from '../WeatherInformation/WeatherInformation';

import { S } from './HomePage.style';

const HOME_TABS: HomeTab[] = ['옷', '룩북', '날씨'];

export type SelectedTime = {
  day: '오늘' | '내일';
  start: string;
  end: string;
};

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const location = useLocation();
  const geolocation = useAppSelector((state) => state.geolocation.value);
  const [tab, setTab] = useState<HomeTab>('옷');
  const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState(false);
  const [times, setTimes] = useState<Time[]>(getTimes);
  const [day, setDay] = useState<DayButtonType>('오늘');

  const {
    data: weatherData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['weather', geolocation?.region],
    queryFn: () => getWeather(times, day, geolocation!.region),
    enabled: !!geolocation,
  });

  const handleTabChange = (_: React.SyntheticEvent, selectedTab: HomeTab) => {
    setTab(selectedTab);
  };

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
        <HomeHeader />

        {isError && <FetchError handleRefetch={refetch} />}
        {isLoading && <HomeLoading />}

        {weatherData && (
          <>
            <div>
              <Tabs labels={HOME_TABS} value={tab} onChange={handleTabChange} />
            </div>

            {(tab === '옷' || tab === '룩북') && (
              <FashionContent weather={weatherData} tab={tab} />
            )}

            {tab === '날씨' && <WeatherInformation weather={weatherData} />}

            <button type='button' onClick={toggleTimeSelector}>
              외출시간 변경하기
            </button>
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
