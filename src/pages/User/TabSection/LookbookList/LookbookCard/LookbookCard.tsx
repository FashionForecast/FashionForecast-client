import { S, C } from './LookbookCard.style';
import { Link } from 'react-router-dom';
import { WeatherType } from '@/types/weather';
import { Outfits } from '@/types/clothes';
import { LOOKBOOK_WEATHER_TYPE } from '@/constants/lookbook';
import PlusIcon from '@/components/icon/PlusIcon';
import ClothesIcon from '@/components/icon/clothes/ClothesIcon';

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

export default LookbookCard;
