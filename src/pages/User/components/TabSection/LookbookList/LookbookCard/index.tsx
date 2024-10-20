import Add from '@/assets/svg/add.svg?react';
import { S, C } from './style';
import 후드티 from '@/components/clothes/후드티';
import 청바지 from '@/components/clothes/청바지';
import 민소매 from '@/components/clothes/민소매';
import 반바지 from '@/components/clothes/반바지';
import 코트 from '@/components/clothes/코트';
import 바지 from '@/components/clothes/바지';
import { Link } from 'react-router-dom';
import { WeatherType } from '@/types/weather';
import { LOOKBOOK_WEATHER_TYPE } from '@/constants/Lookbook/data';

type LookbookCardProps = {
  type: WeatherType;
};

const LookbookCard = ({ type }: LookbookCardProps) => {
  const { title, subtitle } = LOOKBOOK_WEATHER_TYPE[type];

  return (
    <S.LookbookCardWrap $color={type}>
      <S.CardHeader>
        <S.TitleWrap>
          <h6>{title}</h6>
          <span>{subtitle}</span>
        </S.TitleWrap>
        <Link to={`/user/lookbook/create?type=${type}`}>
          <C.IconBtn>
            <Add />
          </C.IconBtn>
        </Link>
      </S.CardHeader>

      <S.ClothesList>
        <S.ClothesItem>
          <S.Top>
            <후드티 />
          </S.Top>
          <청바지 />
        </S.ClothesItem>
        <S.ClothesItem>
          <S.Top>
            <민소매 />
          </S.Top>
          <반바지 />
        </S.ClothesItem>
        <S.ClothesItem>
          <S.Top>
            <코트 />
          </S.Top>
          <반바지 />
        </S.ClothesItem>
        <S.ClothesItem>
          <S.Top>
            <코트 />
          </S.Top>
          <바지 />
        </S.ClothesItem>
      </S.ClothesList>
    </S.LookbookCardWrap>
  );
};

export default LookbookCard;
