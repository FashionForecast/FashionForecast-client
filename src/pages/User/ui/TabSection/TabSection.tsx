import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { TemperatureLookbookList } from '@/widgets/clothes';
import { SettingList } from '@/widgets/member';

import { Tabs } from '@/shared/ui';

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
    <S.TabSectionWrap>
      <S.TabsWrap>
        <Tabs items={MEMBER_TAB} value={tab} onChange={handleTabChange} />
      </S.TabsWrap>

      {tab === 'lookbook' && <TemperatureLookbookList />}
      {tab === 'set' && <SettingList />}
    </S.TabSectionWrap>
  );
};

export default TabSection;
