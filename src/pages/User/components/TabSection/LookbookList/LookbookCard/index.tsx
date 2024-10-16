import Add from '@/assets/svg/add.svg?react';
import { S, C } from './style';
import 후드티 from '@/components/clothes/후드티';
import 청바지 from '@/components/clothes/청바지';
import 민소매 from '@/components/clothes/민소매';
import 반바지 from '@/components/clothes/반바지';
import 코트 from '@/components/clothes/코트';
import 바지 from '@/components/clothes/바지';

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
