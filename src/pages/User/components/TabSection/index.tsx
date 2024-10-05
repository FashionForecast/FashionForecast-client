import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Lookbook from './Lookbook';
import MySetting from './MySetting';

type TabState = '룩북' | '내 설정';

const TabSection = () => {
  const [tab, setTab] = useState<TabState>('룩북');

  const handleTabChange = (_: React.SyntheticEvent, tab: TabState) => {
    setTab(tab);
  };

  return (
    <section>
      <Tabs value={tab} onChange={handleTabChange} variant='fullWidth'>
        <Tab value='룩북' label='룩북' />
        <Tab value='내 설정' label='내 설정' />
      </Tabs>

      <div>
        {tab === '룩북' && <Lookbook />}
        {tab === '내 설정' && <MySetting />}
      </div>
    </section>
  );
};

export default TabSection;
