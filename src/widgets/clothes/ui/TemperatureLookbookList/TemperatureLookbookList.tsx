import { useQuery } from '@tanstack/react-query';

import { getAllLookbookListByWeather } from '@/entities/clothes';

import { useAppSelector } from '@/shared/lib/useAppSelector';

import { LookbookCard } from './LookbookCard/LookbookCard';

export const TemperatureLookbookList = () => {
  const member = useAppSelector((state) => state.member.info);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const { data: lookbook } = useQuery({
    queryKey: ['user', member?.socialId, 'lookbook'],
    queryFn: () => getAllLookbookListByWeather(accessToken),
  });

  return (
    <ol>
      {lookbook?.map(({ tempStageLevel, memberOutfits }) => (
        <LookbookCard
          key={tempStageLevel}
          temperatureStage={tempStageLevel}
          outfits={memberOutfits}
        />
      ))}
    </ol>
  );
};
