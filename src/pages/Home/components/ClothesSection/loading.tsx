import { Skeleton } from '@mui/material';
import styled from '@emotion/styled';

const RecommendClothesLoading = () => {
  return (
    <RecommendClothesWrap>
      <Skeleton variant='rounded' height={93} />
      <Skeleton variant='rounded' height={93} />
      <Skeleton variant='rounded' height={93} />
    </RecommendClothesWrap>
  );
};

export default RecommendClothesLoading;

const RecommendClothesWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;
