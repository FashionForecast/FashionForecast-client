import { useQuery } from '@tanstack/react-query';

import { getAllLookbookListByWeather } from '@/entities/clothes';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { WeatherType } from '@/shared/types';

import LookbookCard from './LookbookCard/LookbookCard';

const LookbookList = () => {
  const user = useAppSelector((state) => state.member.info);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const { data } = useQuery({
    queryKey: ['user', user?.socialId, 'lookbook'],
    queryFn: () => getAllLookbookListByWeather(accessToken),
  });

  return (
    data && (
      <ol>
        {data.map(({ tempStageLevel, memberOutfits }) => (
          <LookbookCard
            key={tempStageLevel}
            type={String(tempStageLevel) as WeatherType}
            outfits={memberOutfits}
          />
        ))}
      </ol>
    )
  );
};

export default LookbookList;
