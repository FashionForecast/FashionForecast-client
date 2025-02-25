import { useCallback, useState } from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';

import { MemberLookbookDto } from '@/entities/clothes/model/types';
import { TempCondition } from '@/entities/member/model/types';
import { WeatherType } from '@/entities/weather';

import { DEFAULT_CLOTHES_BY_WEATHER } from '@/shared/consts/lookbook';
import { HeadHelmet } from '@/shared/ui';

import EditSection from '../../Edit/EditSection';
import LookbookCreateHeader from '../../LookbookCreateHeader/LookbookCreateHeader';
import WeatherHeadline from '../../WeatherHeadline/WeatherHeadline';

import { S } from './UserLookbookCreatePage.style';

export type LookbookSelect = {
  top: { name: string; color: string };
  bottom: {
    name: string;
    color: string;
  };
};

export type LocationState = {
  state?: {
    outfit?: MemberLookbookDto;
    referrer?: string;
    tempOption?: TempCondition;
  };
};

export const UserLookbookCreatePage = () => {
  const [searchParams] = useSearchParams();
  const { state }: LocationState = useLocation();
  const userOutfit = state?.outfit;
  const typeParam = searchParams.get('type');
  const [select, setSelect] = useState<LookbookSelect>(
    defaultSelect(typeParam, userOutfit)
  );

  const updateSelect = useCallback(
    (select: LookbookSelect | ((prev: LookbookSelect) => LookbookSelect)) => {
      setSelect(select);
    },
    []
  );

  if (isInvalidParam(typeParam)) return <Navigate to={'/user'} />;
  return (
    <>
      <HeadHelmet
        title='룩북 만들기'
        description='나만의 계절별 룩북을 만들어보세요.'
        urlPath='/user/lookbook/create'
      />

      <S.PageWrap>
        <LookbookCreateHeader
          weatherType={typeParam as WeatherType}
          select={select}
        />

        <WeatherHeadline weatherType={typeParam as WeatherType} />

        <EditSection
          weatherType={typeParam as WeatherType}
          select={select}
          updateSelect={updateSelect}
        />
      </S.PageWrap>
    </>
  );
};

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
  userOutfit: MemberLookbookDto | undefined
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
