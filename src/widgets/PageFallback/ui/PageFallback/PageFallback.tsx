import { useEffect, useState } from 'react';

import { S } from './pageFallback.style';

export const PageFallback = () => {
  const [isVisible, setIsVisible] = useState(false);

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
