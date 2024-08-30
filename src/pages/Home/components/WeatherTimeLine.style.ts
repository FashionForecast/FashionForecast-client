import styled from '@emotion/styled';

const List = styled.ol`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 18px;
`;

const Item = styled.li`
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 16px;

  &::after {
    position: absolute;
    top: -18px;
    left: calc(50% - 1px);
    display: block;
    width: 0;
    height: 12px;
    content: '';
    border: 1px solid ${({ theme }) => theme.colors.blueGrey[300]};
  }
`;

const Time = styled.time`
  width: 100%;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: right;
`;

const ImageWrap = styled.div`
  margin: 0 16px;
`;

const TepPopWrap = styled.div`
  display: flex;
  width: 100%;
`;

const Tmp = styled.div`
  width: 100%;
  max-width: 46px;
`;

const Pop = styled.div`
  display: flex;
  width: 100%;
  color: ${({ theme }) => theme.colors.info.main};

  &::before {
    width: 1px;
    height: 24px;
    margin: 0 8px;
    content: '';
    border-left: 1px solid rgb(0 0 0 / 12%);
  }
`;

export const S = { List, Item, Time, ImageWrap, TepPopWrap, Tmp, Pop };
