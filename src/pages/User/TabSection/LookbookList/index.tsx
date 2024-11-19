import LookbookCard from './LookbookCard';
import { useQuery } from '@tanstack/react-query';
import useAppSelector from '@/hooks/useAppSelector';
import { getLookbookList } from '@/services/clothes';
import { WeatherType } from '@/types/weather';

const LookbookList = () => {
  const user = useAppSelector((state) => state.user.info);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const { data } = useQuery({
    queryKey: ['user', user?.socialId, 'lookbook'],
    queryFn: () => getLookbookList(accessToken),
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
