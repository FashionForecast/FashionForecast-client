import { Skeleton } from '@mui/material';
import styled from '@emotion/styled';

const HomeLoading = () => {
  return (
    <HomeLoadingWrap>
      <RecommendClothesWrap>
        <Skeleton variant='rounded' height={96} />
        <Skeleton variant='rounded' height={96} />
        <Skeleton variant='rounded' height={96} />
        <Skeleton variant='rounded' height={40} />
      </RecommendClothesWrap>
      <WeatherWrap>
        <WeatherCardWrap>
          <Skeleton variant='rounded' height={178} />
          <TimeLienWrap>
            <Skeleton variant='rounded' width={200} height={30} />
            <Skeleton variant='rounded' width={200} height={30} />
            <Skeleton variant='rounded' width={200} height={30} />
            <Skeleton variant='rounded' width={200} height={30} />
          </TimeLienWrap>
        </WeatherCardWrap>
      </WeatherWrap>
    </HomeLoadingWrap>
  );
};

export default HomeLoading;

const HomeLoadingWrap = styled.div`
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const RecommendClothesWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px;
  margin-bottom: 16px;
`;

const WeatherWrap = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.elevation.outlined};
`;

const WeatherCardWrap = styled.div`
  padding: 16px 16px 0;
`;

const TimeLienWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 16px;

  & span::before {
    position: relative;
    top: -18px;
    left: calc(50% - 1px);
    display: block;
    width: 0;
    height: 12px;
    content: '';
    border: 1px solid ${({ theme }) => theme.colors.blueGrey[300]};
  }
`;
