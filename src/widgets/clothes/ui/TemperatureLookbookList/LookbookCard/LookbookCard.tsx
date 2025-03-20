import { Link } from 'react-router-dom';

import { MemberLookbookDto } from '@/widgets/clothes';

import { ClothesIcon } from '@/entities/clothes/ui/ClothesIcon/ClothesIcon';
import { WeatherTypeNumber } from '@/entities/weather';

import { LOOKBOOK_WEATHER_TYPE } from '@/shared/consts';
import { PlusIcon } from '@/shared/ui';

import { S, C } from './LookbookCard.style';

type LookbookCardProps = {
  type: WeatherTypeNumber;
  outfits: MemberLookbookDto[];
};

export const LookbookCard = ({ type, outfits }: LookbookCardProps) => {
  const { title, subtitle } = LOOKBOOK_WEATHER_TYPE[type];

  return (
    <S.LookbookCardWrap $color={type}>
      <S.CardHeader>
        <S.TitleWrap>
          <h6>{title}</h6>
          <span>{subtitle}</span>
        </S.TitleWrap>
        {outfits.length < 4 && (
          <Link to={`/user/lookbook/create?type=${type}`}>
            <C.IconBtn>
              <PlusIcon />
            </C.IconBtn>
          </Link>
        )}
      </S.CardHeader>

      {outfits.length > 0 && (
        <S.ClothesList>
          {outfits.map((outfit) => (
            <C.LookbookLink
              to={`/user/lookbook/create?type=${type}`}
              state={{ outfit }}
              key={outfit.memberOutfitId}
            >
              <S.ClothesItem key={outfit.memberOutfitId}>
                <S.Top data-top={outfit.topType}>
                  <ClothesIcon name={outfit.topType} color={outfit.topColor} />
                </S.Top>
                <ClothesIcon
                  name={outfit.bottomType}
                  color={outfit.bottomColor}
                />
              </S.ClothesItem>
            </C.LookbookLink>
          ))}
        </S.ClothesList>
      )}
    </S.LookbookCardWrap>
  );
};
