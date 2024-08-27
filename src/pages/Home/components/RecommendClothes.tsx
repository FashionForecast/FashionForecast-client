import { getDefaultClothes } from '@/service/clothes';
import { WeatherResponse } from '@/types/weather';
import { useQuery } from '@tanstack/react-query';
import { C, S } from './RecommendClothes.style';
import clothesImage from '@/assets/clothesImage/반팔티.svg';

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
    <S.Section>
      {data?.data.map(({ name, outfitType }) => (
        <C.ClothesCard elevation={0} key={name}>
          <S.Image src={clothesImage} alt={name} />
          <div>
            <h4>{outfitType}</h4>
            <C.Chip label={name} size='small' />
          </div>
        </C.ClothesCard>
      ))}
    </S.Section>
  );
};

export default RecommendClothes;
