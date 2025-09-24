import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Day, TimeBottomSheet, TimeSelector } from '@/widgets/time';

import { Time, timesActions } from '@/entities/time';
import { getWeather } from '@/entities/weather/api/weather';

import { sendABTestEvent, useAppDispatch } from '@/shared/lib';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import { FetchError, HeadHelmet, Tabs } from '@/shared/ui';

import { HomeTab } from '../model/types';

import { FashionContent } from './FashionContent/FashionContent';
import { HomeHeader } from './HomeHeader/HomeHeader';
import { S } from './HomePage.style';
import { WeatherInformation } from './WeatherInformation/WeatherInformation';
import { WeatherLoading } from './WeatherLoading/WeatherLoading';

const HOME_TABS: { title: string; value: HomeTab }[] = [
  { title: '옷', value: 'clothes' },
  { title: '룩북', value: 'lookbook' },
  { title: '날씨', value: 'weather' },
];

export const HomePage = () => {
  const selectedRegion = useAppSelector((state) => state.region.selectedRegion);

  const [tab, setTab] = useState<HomeTab>('clothes');
  const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState(false);
  const times = useAppSelector((state) => state.times.selected);
  const [day, setDay] = useState<Day>('오늘');
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const {
    data: weatherData,
    isLoading,
    isError,
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
    sendABTestEvent({
      eventName: `HOME_TAB_${selectedTab}_button_click`,
      experiment_id: `${selectedTab}_button_test`,
      label: selectedTab,
    });
  };

  const handleTimeSelectorToggle = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    const isOpen = !isTimeSelectorOpen;

    if (isOpen) params.set('time', 'open');
    else params.delete('time');

    setIsTimeSelectorOpen(isOpen);
    setSearchParams(params);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isTimeSelectorOpen]);

  const handleTimeSubmit = useCallback(
    (newTimes: Time[], newDay: Day) => {
      dispatch(timesActions.updateTimes(newTimes));
      setDay(newDay);
      handleTimeSelectorToggle();
    },
    [handleTimeSelectorToggle]
  );

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

  if (isError) return <FetchError />;
  return (
    <>
      <HeadHelmet />

      <S.HomeWrap>
        <HomeHeader />

        {isLoading && <WeatherLoading />}

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
