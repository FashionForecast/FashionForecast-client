import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { getMemberLookbook } from '@/entities/clothes';
import { MemberLookbookDto } from '@/entities/clothes/model/types';
import { TempCondition } from '@/entities/member/model/types';
import { WeatherType } from '@/entities/weather';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { PlusIcon, ClothesIcon } from '@/shared/ui';

import { WeatherForRecommendClothes } from '../FashionContent';

import { S } from './LookbookList.style';

type LookbookListProps = {
  weather: WeatherForRecommendClothes;
  weatherType: WeatherType;
  tempCondition: TempCondition;
};

const LookbookList = ({
  weather,
  weatherType,
  tempCondition,
}: LookbookListProps) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.member.info);
  const { data } = useQuery({
    queryKey: ['user', user?.socialId, 'lookbook', weather, tempCondition],
    queryFn: () =>
      getMemberLookbook(weather.extremumTmp, tempCondition, accessToken),
    enabled: !!user,
  });
  const navigate = useNavigate();

  const handleLookbookItemClick = (outfit?: MemberLookbookDto) => () => {
    navigate(`/user/lookbook/create?type=${weatherType}`, {
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
