import Add from '@/assets/svg/add.svg?react';
import { S, C } from './style';
import { Link } from 'react-router-dom';
import { WeatherType } from '@/types/weather';
import { LOOKBOOK_WEATHER_TYPE } from '@/constants/Lookbook/data';
import { Outfits } from '@/types/clothes';
import { getClothesImageJSX } from '@/utils/clothes';

type LookbookCardProps = {
  type: WeatherType;
  outfits: Outfits[];
};

const LookbookCard = ({ type, outfits }: LookbookCardProps) => {
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
              <Add />
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
                <S.Top>
                  {getClothesImageJSX(outfit.topType, outfit.topColor)}
                </S.Top>
                {getClothesImageJSX(outfit.bottomType, outfit.bottomColor)}
              </S.ClothesItem>
            </C.LookbookLink>
          ))}
        </S.ClothesList>
      )}
    </S.LookbookCardWrap>
  );
};

export default LookbookCard;
