import { useCallback, useState } from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';

import { MemberLookbookDto } from '@/widgets/clothes';

import { LookbookCreateHeader } from '@/features/clothes';

import { LookbookCreatePageState } from '@/entities/clothes';
import { WEATHER_TYPE, WeatherTypeNumber } from '@/entities/weather';

import { DEFAULT_CLOTHES_BY_WEATHER } from '@/shared/consts/lookbook';
import { HeadHelmet } from '@/shared/ui';

import EditSection from './Edit/EditSection';
import { S } from './UserLookbookCreatePage.style';
import WeatherHeadline from './WeatherHeadline/WeatherHeadline';

export type LookbookSelect = {
  top: { name: string; color: string };
  bottom: {
    name: string;
    color: string;
  };
};

export const UserLookbookCreatePage = () => {
  const [searchParams] = useSearchParams();
  const pageState: LookbookCreatePageState = useLocation().state;
  const weatherTypeNumber = validateWeatherType(searchParams.get('type'));
  const weatherType = WEATHER_TYPE.numberToName[weatherTypeNumber ?? '1'];

  const [select, setSelect] = useState<LookbookSelect>(
    defaultSelect(weatherTypeNumber, pageState?.clickedOutfit)
  );

  const updateSelect = useCallback(
    (select: LookbookSelect | ((prev: LookbookSelect) => LookbookSelect)) => {
      setSelect(select);
    },
    []
  );

  if (!weatherTypeNumber) return <Navigate to={'/user'} />;
  return (
    <>
      <HeadHelmet
        title='룩북 만들기'
        description='나만의 계절별 룩북을 만들어보세요.'
        urlPath='/user/lookbook/create'
      />

      <S.PageWrap>
        <LookbookCreateHeader
          weatherTypeNumber={weatherTypeNumber}
          select={select}
        />

        <WeatherHeadline weatherType={weatherTypeNumber} />

        <EditSection
          weatherType={weatherTypeNumber}
          select={select}
          updateSelect={updateSelect}
        />
      </S.PageWrap>
    </>
  );
};

/** 유효한 weather type number 인지 검증하고 반환 */
function validateWeatherType(weatherTypeParam: string | null) {
  const numberType = Number(weatherTypeParam);

  if (Number.isNaN(numberType)) {
    return null;
  }

  if (numberType <= 0 || numberType >= 9) {
    return null;
  }

  return String(numberType) as WeatherTypeNumber;
}

function defaultSelect(
  weatherTypeNumber: WeatherTypeNumber | null,
  userOutfit: MemberLookbookDto | undefined
) {
  const { top: defaultTop, bottom: defaultBottom } =
    DEFAULT_CLOTHES_BY_WEATHER[weatherTypeNumber ?? '1'];

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
