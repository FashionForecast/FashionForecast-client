import { useCallback, useState } from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';

import { LookbookCreateHeader } from '@/features/clothes';

import {
  LookbookCreatePageState,
  LookbookItem,
  OutfitSelection,
} from '@/entities/clothes';
import {
  WEATHER_TYPE,
  WeatherTypeName,
  WeatherTypeNumber,
} from '@/entities/weather';

import { theme } from '@/shared/styles';
import { HeadHelmet } from '@/shared/ui';

import { REPRESENTATIVE_CLOTHES_BY_WEATHER } from '../model/consts';

import EditSection from './Edit/EditSection';
import { S } from './UserLookbookCreatePage.style';
import { WeatherHeadline } from './WeatherHeadline/WeatherHeadline';

export const UserLookbookCreatePage = () => {
  const [searchParams] = useSearchParams();
  const pageState: LookbookCreatePageState = useLocation().state;
  const weatherTypeNumber = validateWeatherType(searchParams.get('type'));
  const weatherType = WEATHER_TYPE.numberToName[weatherTypeNumber ?? '1'];

  const [selection, setSelection] = useState<OutfitSelection>(
    initializeSelection(weatherType, pageState?.clickedOutfit)
  );

  const updateSelect = useCallback(
    (select: React.SetStateAction<OutfitSelection>) => {
      setSelection(select);
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
          selection={selection}
        />

        <WeatherHeadline weatherType={weatherType} />

        <EditSection
          weatherType={weatherType}
          selection={selection}
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

function initializeSelection(
  weatherType: WeatherTypeName | null,
  userOutfit: LookbookItem | undefined
) {
  const { top: defaultTop, bottom: defaultBottom } =
    REPRESENTATIVE_CLOTHES_BY_WEATHER[weatherType ?? 'sweltering'];
  const defaultColor = theme.colors.blueGrey[50];

  const topName = userOutfit ? userOutfit.topType : defaultTop;
  const topColor = userOutfit ? userOutfit.topColor : defaultColor;

  const bottomName = userOutfit ? userOutfit.bottomType : defaultBottom;
  const bottomColor = userOutfit ? userOutfit.bottomColor : defaultColor;

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
