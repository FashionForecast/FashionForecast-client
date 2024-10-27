import styled from '@emotion/styled';

const UserGenderWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const SectionWrap = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  padding: 64px 16px 0;

  & h3 {
    ${({ theme }) => theme.typo['subtitle-1']}
    display: inline-flex;
    margin: 16px 0;
    font-weight: bold;
  }

  & p {
    ${({ theme }) => theme.typo['body-2']}
    margin-bottom: 64px;
    text-align: center;
  }
`;

const ImageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  width: 100%;
  margin-bottom: 16px;
`;

const GenderButton = styled.button<{ $select: boolean }>`
  ${({ theme }) => theme.typo['subtitle-1']}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  padding: 16px;
  color: ${({ $select, theme }) =>
    $select ? theme.colors.white : theme.colors.text.primary};
  text-align: center;
  background-color: ${({ $select, theme }) =>
    $select ? theme.colors.blueGrey[500] : theme.colors.white};
  border-radius: 16px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      filter: brightness(1.1);
    }
  }

  & .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-bottom: 16px;
    background-color: ${({ $select, theme }) =>
      $select ? theme.colors.white : theme.colors.blueGrey[500]};
    border-radius: 50%;

    & svg {
      fill: ${({ $select, theme }) =>
        $select ? theme.colors.blueGrey[500] : theme.colors.white};
    }
  }
`;

const SubmitButtonWrap = styled.div`
  padding: 0 16px;
  margin-bottom: 16px;
`;

export const S = {
  UserGenderWrap,
  SectionWrap,
  ImageWrap,
  ButtonWrap,
  GenderButton,
  SubmitButtonWrap,
};
