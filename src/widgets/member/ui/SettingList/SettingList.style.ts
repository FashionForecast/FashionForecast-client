import styled from '@emotion/styled';

const SettingSection = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  padding: 0 16px 16px;
`;

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const List = styled.ol`
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius[2]};
`;

export const S = {
  SettingSection,
  ListWrap,
  List,
};
