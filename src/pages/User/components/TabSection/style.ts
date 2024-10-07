import CustomTab from '@/components/CustomMui/CustomTab';
import CustomTabs from '@/components/CustomMui/CustomTabs';
import styled from '@emotion/styled';

const SectionWrap = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Tabs = styled(CustomTabs)`
  min-height: 42px;
  margin-bottom: 16px;
`;

const Tab = styled(CustomTab)`
  min-height: 42px;
  border-bottom: 2px solid rgb(94 95 97 / 30%);
`;

export const S = { SectionWrap, ContentWrap };

export const C = { Tabs, Tab };
