import styled from '@emotion/styled';

const Carousel = styled.ol`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 10px 0;
  overflow-y: hidden;
  touch-action: none;
  cursor: grab;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.blueGrey.A06};
  border-radius: 4px;

  &:first-of-type {
    width: 40%;
    min-width: 64px;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  & {
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }
`;

const Item = styled.li`
  ${({ theme }) => theme.typo['body-2']}
  width: 100%;
  height: 20px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;

  &.is-active {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const S = {
  Carousel,
  Item,
};
