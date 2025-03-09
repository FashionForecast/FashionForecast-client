import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FetchError } from '@/widgets/error';
import {
  Day,
  getDefaultTimes,
  Time,
  TimeBottomSheet,
  TimeSelector,
} from '@/widgets/time';

import { getWeather } from '@/entities/weather/api/weather';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { HeadHelmet, Tabs } from '@/shared/ui';

import HomeLoading from '../../HomeLoading';
import { HomeTab } from '../../model/types';
import { FashionContent } from '../FashionContent/FashionContent';
import { HomeHeader } from '../HomeHeader/HomeHeader';
import { WeatherInformation } from '../WeatherInformation/WeatherInformation';

import { S } from './HomePage.style';

const HOME_TABS: { title: string; value: HomeTab }[] = [
  { title: '옷', value: 'clothes' },
  { title: '룩북', value: 'lookbook' },
  { title: '날씨', value: 'weather' },
];

export type SelectedTime = {
  day: '오늘' | '내일';
  start: string;
  end: string;
};

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const geolocation = useAppSelector((state) => state.geolocation.value);
  const [tab, setTab] = useState<HomeTab>('clothes');
  const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState(false);
  const [times, setTimes] = useState<Time[]>(getDefaultTimes);
  const [day, setDay] = useState<Day>('오늘');

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
    const params = new URLSearchParams(searchParams);
    params.set('tab', selectedTab);

    setTab(selectedTab);
    setSearchParams(params);
  };

  const handleTimeSubmit = () => {
    queryClient.invalidateQueries({ queryKey: ['weather'] });
    handleTimeSelectorToggle();
  };

  const handleTimeSelectorToggle = () => {
    const params = new URLSearchParams(searchParams);
    const isOpen = !isTimeSelectorOpen;

    if (isOpen) params.set('time', 'open');
    else params.delete('time');

    setIsTimeSelectorOpen(isOpen);
    setSearchParams(params);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const updateTimes = (newTimes: Time[] | ((prevTimes: Time[]) => Time[])) => {
    setTimes(newTimes);
  };

  const updateDay = (newDay: Day | ((prevDay: Day) => Day)) => {
    setDay(newDay);
  };

  /**  tab 쿼리 파라미터가 유효하면 해당 값으로 tab 설정 */
  useEffect(() => {
    const tabParameter = searchParams.get('tab');
    const isValidTab =
      tabParameter && HOME_TABS.some((v) => v.value === tabParameter);

    if (isValidTab) {
      setTab(tabParameter as HomeTab);
    }
  }, [searchParams]);

  /** time 쿼리 파라미터가 'open'이면, TimeSelector가 열림 */
  useEffect(() => {
    setIsTimeSelectorOpen(searchParams.get('time') === 'open');
  }, [searchParams]);

  return (
    <>
      <HeadHelmet />

      <S.HomeWrap>
        <HomeHeader />

        {isError && <FetchError handleRefetch={refetch} />}
        {isLoading && <HomeLoading />}

        {weatherData && (
          <>
            <S.TabsWrap>
              <Tabs items={HOME_TABS} value={tab} onChange={handleTabChange} />
            </S.TabsWrap>

            {(tab === 'clothes' || tab === 'lookbook') && (
              <FashionContent weather={weatherData} tab={tab} />
            )}

            {tab === 'weather' && <WeatherInformation weather={weatherData} />}
          </>
        )}

        <TimeBottomSheet
          times={times}
          day={day}
          onTimeSelectorToggle={handleTimeSelectorToggle}
        />

        <TimeSelector
          isOpen={isTimeSelectorOpen}
          times={times}
          day={day}
          updateTimes={updateTimes}
          updateDay={updateDay}
          onClose={handleTimeSelectorToggle}
          onSubmit={handleTimeSubmit}
        />
      </S.HomeWrap>
    </>
  );
};
