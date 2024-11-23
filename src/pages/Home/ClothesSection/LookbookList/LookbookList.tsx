import { getUserLookbookByTemp } from '@/services/clothes';
import { S } from './LookbookList.style';
import { useQuery } from '@tanstack/react-query';
import useAppSelector from '@/hooks/useAppSelector';
import { ClothesForWeather, TempCondition } from '../ClothesSection';
import { Outfits } from '@/types/clothes';
import { WeatherType } from '@/types/weather';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import PlusIcon from '@/components/icon/PlusIcon';
import ClothesIcon from '@/components/icon/clothes/ClothesIcon';

type LookbookListProps = {
  weather: ClothesForWeather;
  weatherType: WeatherType;
  tempCondition: TempCondition;
};

const LookbookList = ({
  weather,
  weatherType,
  tempCondition,
}: LookbookListProps) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.user.info);
  const { data } = useQuery({
    queryKey: ['user', user?.socialId, 'lookbook', weather, tempCondition],
    queryFn: () =>
      getUserLookbookByTemp(weather.extremumTmp, tempCondition, accessToken),
    enabled: !!user,
  });
  const navigate = useNavigate();

  const handleLookbookItemClick = (outfit?: Outfits) => () => {
    let type = Number(weatherType);

    if (tempCondition === 'COOL') type = type - 1;
    else if (tempCondition === 'WARM') type = type + 1;

    navigate(`/user/lookbook/create?type=${type}`, {
      state: {
        outfit,
        referrer: `/?tab=lookbook&option=${tempCondition}`,
        tempOption: tempCondition,
      },
    });
  };

  return (
    <S.LookbookList>
      {data?.map((outfit) => (
        <S.LookbookCard
          key={outfit.memberOutfitId}
          onClick={handleLookbookItemClick(outfit)}
        >
          <S.Top data-top={outfit.topType}>
            <ClothesIcon name={outfit.topType} color={outfit.topColor} />
          </S.Top>
          <ClothesIcon name={outfit.bottomType} color={outfit.bottomColor} />
        </S.LookbookCard>
      ))}

      {(!data || data.length <= 3) && (
        <S.LookbookCard $content='add' onClick={handleLookbookItemClick()}>
          <S.IconWrap>
            <PlusIcon />
          </S.IconWrap>
          <span>추가하기</span>
        </S.LookbookCard>
      )}
    </S.LookbookList>
  );
};

export default memo(LookbookList);
