import { Skeleton } from '@mui/material';
import styled from '@emotion/styled';

const RecommendClothesLoading = () => {
  return (
    <RecommendClothesWrap>
      <Skeleton variant='rounded' height={96} />
      <Skeleton variant='rounded' height={96} />
      <Skeleton variant='rounded' height={96} />
    </RecommendClothesWrap>
  );
};

export default RecommendClothesLoading;

const RecommendClothesWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;
