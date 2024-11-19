import { useState } from 'react';
import LookbookList from './LookbookList';
import SettingList from './SettingList/SettingList';
import BookFillIcon from '@/assets/svg/bookFill.svg?react';
import BookOutlineIcon from '@/assets/svg/bookOutline.svg?react';
import UserFillIcon from '@/assets/svg/userFill.svg?react';
import UserOutlineIcon from '@/assets/svg/userOutline.svg?react';
import { C, S } from './TabSection.style';
import { useSearchParams } from 'react-router-dom';

type TabState = '룩북' | '내 설정';

const TabSection = () => {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<TabState>(
    searchParams.get('tab') === 'set' ? '내 설정' : '룩북'
  );

  const handleTabChange = (_: React.SyntheticEvent, tab: TabState) => {
    setTab(tab);
  };

  return (
    <S.SectionWrap>
      <C.Tabs value={tab} onChange={handleTabChange} variant='fullWidth'>
        <C.Tab
          value='룩북'
          label='룩북'
          icon={tab === '룩북' ? <BookFillIcon /> : <BookOutlineIcon />}
          iconPosition='start'
        />
        <C.Tab
          value='내 설정'
          label='내 설정'
          icon={tab === '내 설정' ? <UserFillIcon /> : <UserOutlineIcon />}
          iconPosition='start'
        />
      </C.Tabs>

      <S.ContentWrap>
        {tab === '룩북' && <LookbookList />}
        {tab === '내 설정' && <SettingList />}
      </S.ContentWrap>
    </S.SectionWrap>
  );
};

export default TabSection;
