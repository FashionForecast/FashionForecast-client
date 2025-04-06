import { useEffect, useState } from 'react';

import { WeatherIcon } from '@/entities/weather';

import { S } from './WeatherLoading.style';

const ICON_MAP = new Map([
  [0, <WeatherIcon name='CLEAR' />],
  [1, <WeatherIcon name='CLOUDY' />],
  [2, <WeatherIcon name='RAIN' />],
]);

export const WeatherLoading = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);

  /** 아이콘을 순환시키는 interval 설정 */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ICON_MAP.size);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /** 로딩 애니메이션이 지연 후 보여지도록 설정 */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 700);

    return () => clearInterval(timer);
  }, []);

  return (
    <S.HomeLoadingWrap $isVisible={isVisible}>
      <S.Frame>
        <S.IconWrap>{ICON_MAP.get(index)}</S.IconWrap>
      </S.Frame>

      <S.Text>날씨를 알아보고 있어요</S.Text>
    </S.HomeLoadingWrap>
  );
};
