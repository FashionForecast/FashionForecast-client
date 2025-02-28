import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
    const isOpen = !isTimeSelectorOpen;
    setIsTimeSelectorOpen(isOpen);

    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  /**  tab 쿼리 파라미터가 유효하면 해당 값으로 tab 설정 */
  useEffect(() => {
    const tabParameter = searchParams.get('tab');
    const isValidHomeTab = HOME_TABS.find((v) => v.value === tabParameter);

    if (isValidHomeTab) {
      setTab(tabParameter as HomeTab);
    }
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

            <button type='button' onClick={handleTimeSelectorToggle}>
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
          onClose={handleTimeSelectorToggle}
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
