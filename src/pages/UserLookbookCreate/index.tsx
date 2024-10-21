import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import LookbookCreateHeader from './components/LookbookCreateHeader';
import { S } from './style';
import TypeHeadline from './components/TypeHeadline';
import { WeatherType } from '@/types/weather';
import Edit from './components/Edit';
import { DEFAULT_CLOTHES_BY_WEATHER } from '@/constants/Lookbook/data';
import { useState } from 'react';
import { Outfits } from '@/types/clothes';

export type LookbookSelect = {
  top: { name: string; color: string };
  bottom: {
    name: string;
    color: string;
  };
};

export type LocationState = {
  state?: {
    outfit: Outfits;
  };
};

const UserLookbookCreate = () => {
  const [searchParams] = useSearchParams();
  const { state }: LocationState = useLocation();
  const userOutfit = state?.outfit;
  const typeParam = searchParams.get('type');
  const [select, setSelect] = useState<LookbookSelect>(
    defaultSelect(typeParam, userOutfit)
  );

  const updateSelect = (
    select: LookbookSelect | ((prev: LookbookSelect) => LookbookSelect)
  ) => {
    setSelect(select);
  };

  if (isInvalidParam(typeParam)) return <Navigate to={'/user'} />;
  return (
    <S.PageWrap>
      <LookbookCreateHeader
        weatherType={typeParam as WeatherType}
        select={select}
      />

      <TypeHeadline weatherType={typeParam as WeatherType} />

      <Edit
        weatherType={typeParam as WeatherType}
        select={select}
        updateSelect={updateSelect}
      />
    </S.PageWrap>
  );
};

export default UserLookbookCreate;

// type이 1~8 사이가 아니면, 유효하지 않은 parameter
function isInvalidParam(typeParam: string | null) {
  const typeNumber = Number(typeParam);

  return (
    !typeParam ||
    !Number.isInteger(typeNumber) ||
    typeNumber <= 0 ||
    typeNumber >= 9
  );
}

function defaultSelect(
  typeParam: string | null,
  userOutfit: Outfits | undefined
) {
  const type = (isInvalidParam(typeParam) ? '1' : typeParam) as WeatherType;
  const { top: defaultTop, bottom: defaultBottom } =
    DEFAULT_CLOTHES_BY_WEATHER[type];

  const topName = userOutfit ? userOutfit.topType : defaultTop;
  const topColor = userOutfit ? userOutfit.topColor : '#F9FAFB';

  const bottomName = userOutfit ? userOutfit.bottomType : defaultBottom;
  const bottomColor = userOutfit ? userOutfit.bottomColor : '#F9FAFB';

  return {
    top: {
      name: topName,
      color: topColor,
    },
    bottom: {
      name: bottomName,
      color: bottomColor,
    },
  };
}
