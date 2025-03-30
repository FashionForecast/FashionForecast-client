import { Link } from 'react-router-dom';

import {
  LookbookClothes,
  LookbookCreatePageState,
  LookbookItem,
} from '@/entities/clothes';
import {
  WEATHER_COLORS,
  WEATHER_LABELS,
  WEATHER_TYPE,
  WeatherTypeNumber,
} from '@/entities/weather';

import { IconButton, PlusIcon } from '@/shared/ui';

import { S, C } from './LookbookCard.style';

type LookbookCardProps = {
  temperatureStage: number;
  outfits: LookbookItem[];
};

export const LookbookCard = ({
  temperatureStage,
  outfits,
}: LookbookCardProps) => {
  const weatherNumber = String(temperatureStage) as WeatherTypeNumber;
  const weatherName = WEATHER_TYPE.numberToName[weatherNumber];

  const { light, main, deep } = WEATHER_COLORS[weatherName];
  const { temperature, summary } = WEATHER_LABELS[weatherName];

  const setLinkState = (outfit: LookbookItem): LookbookCreatePageState => {
    return { clickedOutfit: outfit };
  };

  return (
    <S.LookbookCardWrap $color={main}>
      <S.CardHeader>
        <S.LABELS $color={deep}>
          <S.Temperature>{temperature}</S.Temperature>
          <S.Summary>{summary}</S.Summary>
        </S.LABELS>

        {outfits.length <= 3 && (
          <Link to={`/lookbook/create?type=${temperatureStage}`}>
            <IconButton>
              <PlusIcon width={14} height={14} />
            </IconButton>
          </Link>
        )}
      </S.CardHeader>

      <S.ClothesList>
        {outfits.map((outfit) => (
          <C.LookbookLink
            to={`/lookbook/create?type=${temperatureStage}`}
            state={setLinkState(outfit)}
            key={outfit.memberOutfitId}
          >
            <S.ClothesItem>
              <LookbookClothes
                topName={outfit.topType}
                topColor={outfit.topColor}
                bottomName={outfit.bottomType}
                bottomColor={outfit.bottomColor}
              />
            </S.ClothesItem>

            <S.ChipWrap>
              <C.TopNameChip
                label={outfit.topType}
                color={light}
                size='small'
              />
              <C.BottomNameChip
                label={outfit.bottomType}
                color={light}
                size='small'
              />
            </S.ChipWrap>
          </C.LookbookLink>
        ))}
      </S.ClothesList>
    </S.LookbookCardWrap>
  );
};
