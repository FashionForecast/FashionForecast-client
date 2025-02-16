import styled from '@emotion/styled';

import { CustomTab, CustomTabs } from '@/shared/ui';

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

  & svg {
    margin-right: 8px;
  }
`;

export const S = { SectionWrap, ContentWrap };

export const C = { Tabs, Tab };
