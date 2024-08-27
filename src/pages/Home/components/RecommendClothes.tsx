import { getDefaultClothes } from '@/service/clothes';
import { WeatherResponse } from '@/types/weather';
import { useQuery } from '@tanstack/react-query';

export type ClothesForWeather = Pick<
  WeatherResponse['data'],
  'extremumTmp' | 'maxMinTmpDiff' | 'maximumPcp' | 'maximumPop'
>;

type RecommendClothesProps = {
  weather: ClothesForWeather;
};

const RecommendClothes = ({ weather }: RecommendClothesProps) => {
  const { data, isError } = useQuery({
    queryKey: ['clothes'],
    queryFn: () => getDefaultClothes(weather),
  });

  if (isError) return <div>추천 옷 오류가 발생했습니다.</div>;
  return (
    <section>
      {data?.data.map(({ name, outfitType }) => (
        <div key={name}>
          <h4>{outfitType}</h4>
          <span>{name}</span>
        </div>
      ))}
    </section>
  );
};

export default RecommendClothes;
