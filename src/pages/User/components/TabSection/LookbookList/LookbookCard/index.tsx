import Add from '@/assets/svg/add.svg?react';
import { S, C } from './style';
import 민소매 from '@/assets/svg/clothes/민소매.svg?react';
import 후드티 from '@/assets/svg/clothes/후드티.svg?react';
import 반바지 from '@/assets/svg/clothes/반바지.svg?react';
import 청바지 from '@/assets/svg/clothes/청바지.svg?react';

export type WeatherType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

type LookbookCardProps = {
  type: WeatherType;
  title: string;
};

const LookbookCard = ({ type, title }: LookbookCardProps) => {
  return (
    <S.LookbookCardWrap $color={type}>
      <S.CardHeader>
        <span>계절 {type}</span>
        <h3>{title}</h3>
        <div>
          <C.IconBtn>
            <Add />
          </C.IconBtn>
        </div>
      </S.CardHeader>

      <S.ClothesList>
        <S.ClothesItem>
          <후드티 />
          <청바지 />
        </S.ClothesItem>
        <S.ClothesItem>
          <민소매 />
          <반바지 />
        </S.ClothesItem>
      </S.ClothesList>
    </S.LookbookCardWrap>
  );
};

export default LookbookCard;
