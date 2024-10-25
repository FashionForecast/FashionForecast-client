import { getUserLookbookByTemp } from '@/service/clothes';
import { S } from './style';
import { useQuery } from '@tanstack/react-query';
import useAppSelector from '@/hooks/useAppSelector';
import { ClothesForWeather, TempCondition } from '..';
import { Outfits } from '@/types/clothes';
import { WeatherType } from '@/types/weather';
import { useNavigate } from 'react-router-dom';
import { getClothesImageJSX } from '@/utils/clothes';
import AddIcon from '@/assets/svg/add.svg?react';

type LookbookClothesProps = {
  weather: ClothesForWeather;
  weatherType: WeatherType;
  tempCondition: TempCondition;
};

const LookbookClothes = ({
  weather,
  weatherType,
  tempCondition,
}: LookbookClothesProps) => {
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
            {getClothesImageJSX(outfit.topType, outfit.topColor)}
          </S.Top>
          {getClothesImageJSX(outfit.bottomType, outfit.bottomColor)}
        </S.LookbookCard>
      ))}

      {(!data || data.length <= 3) && (
        <S.LookbookCard $content='add' onClick={handleLookbookItemClick()}>
          <S.IconWrap>
            <AddIcon />
          </S.IconWrap>
          <span>추가하기</span>
        </S.LookbookCard>
      )}
    </S.LookbookList>
  );
};

export default LookbookClothes;
