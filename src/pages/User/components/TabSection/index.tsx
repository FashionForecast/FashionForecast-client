import { useState } from 'react';
import Lookbook from './Lookbook';
import MySetting from './MySetting';
import CustomTabs from '@/components/CustomMui/CustomTabs';
import CustomTab from '@/components/CustomMui/CustomTab';
import LookbookIcon from '@/assets/svg/lookbook.svg?react';
import SettingIcon from '@/assets/svg/setting.svg?react';

type TabState = '룩북' | '내 설정';

const TabSection = () => {
  const [tab, setTab] = useState<TabState>('룩북');

  const handleTabChange = (_: React.SyntheticEvent, tab: TabState) => {
    setTab(tab);
  };

  return (
    <section>
      <CustomTabs value={tab} onChange={handleTabChange} variant='fullWidth'>
        <CustomTab
          value='룩북'
          label='룩북'
          icon={<LookbookIcon />}
          iconPosition='start'
        />
        <CustomTab
          value='내 설정'
          label='내 설정'
          icon={<SettingIcon />}
          iconPosition='start'
        />
      </CustomTabs>

      <div>
        {tab === '룩북' && <Lookbook />}
        {tab === '내 설정' && <MySetting />}
      </div>
    </section>
  );
};

export default TabSection;
