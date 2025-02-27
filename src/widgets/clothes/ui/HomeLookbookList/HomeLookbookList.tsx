import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { ClothesIcon } from '@/entities/clothes/ui/ClothesIcon/ClothesIcon';
import {
  TemperatureCondition,
  WEATHER_TYPE,
  WeatherTypeName,
} from '@/entities/weather';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { PlusIcon } from '@/shared/ui';

import { getMemberLookbook } from '../../api/lookbook';
import {
  MemberLookbookDto,
  WeatherForRecommendClothes,
} from '../../model/types';

import { S } from './HomeLookbookList.style';

type HomeLookbookListProps = {
  weather: WeatherForRecommendClothes;
  adjustedWeatherName: WeatherTypeName;
  temperatureCondition: TemperatureCondition;
};

export const HomeLookbookList = memo(
  ({
    weather,
    adjustedWeatherName,
    temperatureCondition,
  }: HomeLookbookListProps) => {
    const accessToken = useAppSelector((state) => state.auth.accessToken);
    const user = useAppSelector((state) => state.member.info);
    const { data } = useQuery({
      queryKey: [
        'user',
        user?.socialId,
        'lookbook',
        weather,
        temperatureCondition,
      ],
      queryFn: () =>
        getMemberLookbook(
          weather.extremumTmp,
          temperatureCondition,
          accessToken
        ),
      enabled: !!user,
    });
    const navigate = useNavigate();

    const handleLookbookItemClick = (outfit?: MemberLookbookDto) => () => {
      const weatherNumber = WEATHER_TYPE.nameToNumber[adjustedWeatherName];
      navigate(`/user/lookbook/create?type=${weatherNumber}`, {
        state: {
          outfit,
          referrer: `/?tab=lookbook&option=${temperatureCondition}`,
          tempOption: temperatureCondition,
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
  }
);
