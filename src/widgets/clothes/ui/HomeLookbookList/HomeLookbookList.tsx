import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  LookbookClothes,
  LookbookCreatePageState,
  LookbookItem,
} from '@/entities/clothes';
import {
  TemperatureCondition,
  WEATHER_TYPE,
  WeatherTypeName,
} from '@/entities/weather';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { Button, Chip, PlusIcon } from '@/shared/ui';

import { getMemberLookbook } from '../../api/lookbook';
import { CLOTHES_THUMBNAIL } from '../../model/consts';

import { S } from './HomeLookbookList.style';

type HomeLookbookListProps = {
  extremumTemperature: number;
  adjustedWeatherName: WeatherTypeName;
  temperatureCondition: TemperatureCondition;
};

export const HomeLookbookList = memo(
  ({
    extremumTemperature,
    adjustedWeatherName,
    temperatureCondition,
  }: HomeLookbookListProps) => {
    const accessToken = useAppSelector((state) => state.auth.accessToken);
    const member = useAppSelector((state) => state.member.info);
    const { data: lookbook } = useQuery({
      queryKey: [
        'user',
        member?.socialId,
        'lookbook',
        extremumTemperature,
        temperatureCondition,
      ],
      queryFn: () =>
        getMemberLookbook(
          extremumTemperature,
          temperatureCondition,
          accessToken
        ),
      enabled: !!member,
    });

    const navigate = useNavigate();

    const handleLookbookItemClick = (outfit?: LookbookItem) => () => {
      if (!member) {
        navigate('/login');
        return;
      }

      const weatherNumber = WEATHER_TYPE.nameToNumber[adjustedWeatherName];
      const linkState: LookbookCreatePageState = {
        clickedOutfit: outfit,
        referrer: `/?tab=lookbook&temperatureCondition=${temperatureCondition}`,
      };

      navigate(`/user/lookbook/create?type=${weatherNumber}`, {
        state: linkState,
      });
    };

    return (
      <S.LookbookListWrap>
        {lookbook && lookbook.length >= 1 && (
          <S.LookbookList>
            {lookbook.map((outfit) => (
              <S.LookbookCard
                key={outfit.memberOutfitId}
                onClick={handleLookbookItemClick(outfit)}
              >
                <S.LookbookContent>
                  <LookbookClothes
                    topName={outfit.topType}
                    topColor={outfit.topColor}
                    bottomName={outfit.bottomType}
                    bottomColor={outfit.bottomColor}
                  />

                  <S.ChipWrap>
                    <Chip label={outfit.topType} size='small' />
                    <Chip label={outfit.bottomType} size='small' />
                  </S.ChipWrap>
                </S.LookbookContent>
              </S.LookbookCard>
            ))}

            {lookbook.length <= 3 && (
              <S.AddCard onClick={handleLookbookItemClick()}>
                <S.AddContent>
                  <PlusIcon />
                  <S.AddText>추가하기</S.AddText>
                </S.AddContent>
              </S.AddCard>
            )}
          </S.LookbookList>
        )}

        {(!member || (lookbook && lookbook.length === 0)) && (
          <S.EmptyCard>
            <S.EmptyContent>
              <S.TextWrap>
                <strong>나의 옷장에 기온을 담아보세요</strong>
                <p>
                  옷차림 고민할 필요 없이 <br />
                  날씨에 맞는 나의 옷장을 확인하세요!
                </p>

                <S.BackgroundClothes>
                  <LookbookClothes
                    topName={CLOTHES_THUMBNAIL[adjustedWeatherName].TOP}
                    topColor={'#F9FAFB'}
                    bottomName={CLOTHES_THUMBNAIL[adjustedWeatherName].BOTTOM}
                    bottomColor={'#F9FAFB'}
                  />
                </S.BackgroundClothes>
              </S.TextWrap>

              <Button onClick={handleLookbookItemClick()}>룩북 추가하기</Button>
            </S.EmptyContent>
          </S.EmptyCard>
        )}
      </S.LookbookListWrap>
    );
  }
);
