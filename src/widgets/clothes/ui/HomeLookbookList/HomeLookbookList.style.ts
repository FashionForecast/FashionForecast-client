import styled from '@emotion/styled';

const ListWrap = styled.ol`
  display: grid;
  flex-grow: 1;
  flex-wrap: wrap;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
  padding: 0 16px;
  margin-bottom: 12px;
`;

const LookbookCard = styled.li<{ $content?: 'lookbook' | 'add' }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px 0 12px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius[2]};
`;

const LookbookContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-height: 192px;
`;

const AddCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 12px;
  cursor: pointer;
  border: 2px dashed ${({ theme }) => theme.colors.elevation.outlined};
  border-radius: ${({ theme }) => theme.borderRadius[2]};
`;

const TopClothes = styled.div`
  position: relative;
  top: 10px;
  display: flex;
  align-items: flex-end;
`;

const ChipWrap = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  gap: 4px;
`;

const AddContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-height: 192px;

  & svg {
    position: relative;
    top: -12px;
  }
`;

const AddText = styled.span`
  position: absolute;
  bottom: 0;
  ${({ theme }) => theme.typo.captionBold}
  color: ${({ theme }) => theme.colors.text.primary}
`;

const EmptyWrap = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  margin: 0 16px 16px;
  border: 2px dashed ${({ theme }) => theme.colors.elevation.outlined};
  border-radius: ${({ theme }) => theme.borderRadius[2]};
`;

const EmptyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const TextWrap = styled.div`
  position: relative;
  padding: 36px 0;
  margin-bottom: 16px;
  text-align: center;

  & strong {
    ${({ theme }) => theme.typo['subtitle-1']}
    position: relative;
    z-index: 100;
    display: inline-block;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  & p {
    ${({ theme }) => theme.typo['body-2']}
    position: relative;
    z-index: 100;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const BackgroundClothes = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.25;
  transform: translate(-50%, -50%);
`;

export const S = {
  ListWrap,
  LookbookCard,
  LookbookContent,
  AddCard,
  AddContent,
  ChipWrap,
  TopClothes,
  AddText,
  EmptyWrap,
  EmptyContent,
  TextWrap,
  BackgroundClothes,
};
