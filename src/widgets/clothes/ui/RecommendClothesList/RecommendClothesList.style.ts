import styled from '@emotion/styled';

const RecommendWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 16px;
`;

const ClothesCard = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  padding: 10.22px 17.74px;
  margin-bottom: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;

  & h4 {
    ${({ theme }) => theme.typo['subtitle-1']}
    margin-bottom: 8px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  min-height: 72px;
`;

const ImageWrap = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 98px;
  height: 64px;
  margin-right: 16px;
`;

const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const S = {
  RecommendWrap,
  ClothesCard,
  CardContent,
  ImageWrap,
  ChipWrapper,
};
