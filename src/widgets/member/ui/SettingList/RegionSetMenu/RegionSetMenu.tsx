import { Link } from 'react-router-dom';

import { SetCard } from '@/entities/member';
import { SearchPageState } from '@/entities/search';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { RegionPinIcon } from '@/shared/ui';

export const RegionSetMenu = () => {
  const member = useAppSelector((state) => state.member.info);
  const linkState: SearchPageState = { mode: 'memberSetting' };

  if (!member) return <></>;
  return (
    <Link to={'/search'} state={linkState}>
      <SetCard
        icon={<RegionPinIcon />}
        title='기본 위치'
        value={member.region === 'DEFAULT' ? '현재 위치' : member.region}
      />
    </Link>
  );
};
