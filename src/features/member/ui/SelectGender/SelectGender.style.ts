import styled from '@emotion/styled';

import { ListItemButton } from '@/shared/ui';

const SelectGenderWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
  justify-content: center;
  padding: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const ClothesGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-bottom: 48px;
`;

const Title = styled.strong`
  ${({ theme }) => theme.typo['subtitle-1']}
  margin-bottom: 16px;
`;

const Description = styled.p`
  ${({ theme }) => theme.typo['body-2']}
  margin-bottom: 44px;
  text-align: center;
`;

const GenderButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  max-width: 500px;
`;

const GenderButton = styled(ListItemButton)`
  height: 105px;
`;

export const S = {
  SelectGenderWrap,
  Article,
  ClothesGroup,
  Title,
  Description,
  GenderButtonGroup,
};

export const C = {
  GenderButton,
};
