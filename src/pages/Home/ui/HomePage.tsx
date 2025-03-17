import { useQuery } from '@tanstack/react-query';
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

import HomeLoading from '../HomeLoading';
import { HomeTab } from '../model/types';

import { FashionContent } from './FashionContent/FashionContent';
import { HomeHeader } from './HomeHeader/HomeHeader';
import { S } from './HomePage.style';
import { WeatherInformation } from './WeatherInformation/WeatherInformation';

const HOME_TABS: { title: string; value: HomeTab }[] = [
  { title: '옷', value: 'clothes' },
  { title: '룩북', value: 'lookbook' },
  { title: '날씨', value: 'weather' },
];

export const HomePage = () => {
  const selectedRegion = useAppSelector((state) => state.region.selectedRegion);
  console.log(selectedRegion);

  const [tab, setTab] = useState<HomeTab>('clothes');
  const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState(false);
  const [times, setTimes] = useState(getDefaultTimes);
  const [day, setDay] = useState<Day>('오늘');
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: weatherData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['weather', selectedRegion?.region, times, day],
    queryFn: () => getWeather(times, day, selectedRegion!.region),
    enabled: !!selectedRegion,
  });

  const handleTabChange = (_: React.SyntheticEvent, selectedTab: HomeTab) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', selectedTab);

    setTab(selectedTab);
    setSearchParams(params);
  };

  const handleTimeSubmit = (newTimes: Time[], newDay: Day) => {
    setTimes(newTimes);
    setDay(newDay);
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
          onClose={handleTimeSelectorToggle}
          onSubmit={handleTimeSubmit}
        />
      </S.HomeWrap>
    </>
  );
};
