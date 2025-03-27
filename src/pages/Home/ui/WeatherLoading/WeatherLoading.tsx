import { useEffect, useState } from 'react';

import { theme } from '@/shared/styles';
import { SunIcon } from '@/shared/ui';

import { S } from './WeatherLoading.style';

const ICON_COLOR_MAP = new Map([
  [0, theme.colors.orange[400]],
  [1, theme.colors.red[400]],
  [2, theme.colors.lightGreen[400]],
]);

export const WeatherLoading = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);

  /** 아이콘을 순환시키는 interval 설정 */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ICON_COLOR_MAP.size);
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
        <S.IconWrap>
          <S.Circle $color={ICON_COLOR_MAP.get(index)!}>
            <SunIcon />
          </S.Circle>
        </S.IconWrap>
      </S.Frame>

      <S.Text>날씨를 알아보고 있어요</S.Text>
    </S.HomeLoadingWrap>
  );
};
