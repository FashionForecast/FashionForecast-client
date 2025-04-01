import styled from '@emotion/styled';

const ClothesWrap = styled.div<{ $top: number }>`
  position: relative;
  top: ${({ $top }) => `${-$top}px`};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TopClothes = styled.div<{ $top: number }>`
  position: relative;
  top: ${({ $top }) => `${$top}px`};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const S = { TopClothes, ClothesWrap };
