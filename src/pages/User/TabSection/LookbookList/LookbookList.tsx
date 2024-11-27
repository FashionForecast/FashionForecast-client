import LookbookCard from './LookbookCard/LookbookCard';
import { useQuery } from '@tanstack/react-query';
import useAppSelector from '@/hooks/useAppSelector';
import { getAllLookbookListByWeather } from '@/services/clothes';
import { WeatherType } from '@/types/weather';

const LookbookList = () => {
  const user = useAppSelector((state) => state.user.info);
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
