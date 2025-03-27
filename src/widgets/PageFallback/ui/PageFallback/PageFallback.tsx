import { useEffect, useState } from 'react';

import { S } from './pageFallback.style';

export const PageFallback = () => {
  const [isVisible, setIsVisible] = useState(false);

  /** 로딩 애니메이션이 지연 후 보여지도록 설정 */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <S.PageFallbackWrap>
      <S.Logo src='/logo.svg' alt='로고 이미지' $isVisible={isVisible} />
    </S.PageFallbackWrap>
  );
};
