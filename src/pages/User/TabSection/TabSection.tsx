import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Tabs } from '@/shared/ui';

import LookbookList from './LookbookList/LookbookList';
import SettingList from './SettingList/SettingList';
import { S } from './TabSection.style';

type TabState = '룩북' | '설정';

const TabSection = () => {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<TabState>(
    searchParams.get('tab') === 'set' ? '설정' : '룩북'
  );

  const handleTabChange = (_: React.SyntheticEvent, tab: TabState) => {
    setTab(tab);
  };

  return (
    <S.SectionWrap>
      <Tabs labels={['룩북', '설정']} value={tab} onChange={handleTabChange} />

      <S.ContentWrap>
        {tab === '룩북' && <LookbookList />}
        {tab === '설정' && <SettingList />}
      </S.ContentWrap>
    </S.SectionWrap>
  );
};

export default TabSection;
