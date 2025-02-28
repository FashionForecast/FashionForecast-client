import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Tabs } from '@/shared/ui';

import LookbookList from './LookbookList/LookbookList';
import SettingList from './SettingList/SettingList';
import { S } from './TabSection.style';

type MemberTab = 'lookbook' | 'set';
const MEMBER_TAB = [
  { title: '룩북', value: 'lookbook' },
  { title: '설정', value: 'set' },
];

const TabSection = () => {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<MemberTab>(
    searchParams.get('tab') === 'set' ? 'set' : 'lookbook'
  );

  const handleTabChange = (_: React.SyntheticEvent, tab: MemberTab) => {
    setTab(tab);
  };

  return (
    <S.SectionWrap>
      <Tabs items={MEMBER_TAB} value={tab} onChange={handleTabChange} />

      <S.ContentWrap>
        {tab === 'lookbook' && <LookbookList />}
        {tab === 'set' && <SettingList />}
      </S.ContentWrap>
    </S.SectionWrap>
  );
};

export default TabSection;
