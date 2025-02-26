import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';

export const RecommendClothesLoading = () => {
  return (
    <RecommendClothesWrap>
      <Skeleton variant='rounded' height={93} />
      <Skeleton variant='rounded' height={93} />
      <Skeleton variant='rounded' height={93} />
    </RecommendClothesWrap>
  );
};

const RecommendClothesWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;
