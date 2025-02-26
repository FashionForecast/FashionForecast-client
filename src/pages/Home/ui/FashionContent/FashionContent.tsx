import { memo, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { RecommendClothes } from '@/widgets/clothes';

import { TempCondition } from '@/entities/member';
import {
  WEATHER_TYPES,
  WeatherDto,
  WeatherType,
  WeatherTypeName,
} from '@/entities/weather';

import { useAppSelector } from '@/shared/lib/useAppSelector';

import { HomeTab } from '../../model/types';

import ConditionButtonGroup from './ConditionButtonGroup/ConditionButtonGroup';
import { S } from './FashionContent.style';
import Headline from './Headline/Headline';
import LookbookList from './LookbookList/LookbookList';

export const COOL = 'COOL',
  NORMAL = 'NORMAL',
  WARM = 'WARM';

const Options = new Map([
  [COOL, COOL],
  [NORMAL, NORMAL],
  [WARM, WARM],
]);

type FashionContentProps = {
  tab: Exclude<HomeTab, '날씨'>;
  weather: WeatherDto;
};

export const FashionContent = memo(({ tab, weather }: FashionContentProps) => {
  const member = useAppSelector((state) => state.member.info);
  const [searchParams] = useSearchParams();
  const tempParamOption = searchParams.get('option');
  const [temperatureCondition, setTemperatureCondition] =
    useState<TempCondition>(() =>
      initializeTempCondition(
        weather.extremumTmp,
        member?.tempCondition,
        tempParamOption
      )
    );
  const weatherName = mapTemperatureToWeatherName(weather.extremumTmp);
  const adjustedWeatherType = adjustWeatherTypeByCondition(
    temperatureCondition,
    weatherName
  );

  const handleTempConditionChange = useCallback(
    (_e: React.MouseEvent<HTMLElement>, condition: TempCondition) => {
      if (!condition) return;
      setTemperatureCondition(condition);
    },
    []
  );

  return (
    <S.Section>
      <Headline weatherName={weatherName} />

      {tab === '옷' && (
        <RecommendClothes
          weather={{
            extremumTmp: weather.extremumTmp,
            maxMinTmpDiff: weather.maxMinTmpDiff,
            maximumPop: weather.maximumPop,
            maximumPcp: weather.maximumPcp,
          }}
          weatherName={weatherName}
          weatherType={adjustedWeatherType}
          temperatureCondition={temperatureCondition}
        />
      )}

      {tab === '룩북' && member && (
        <>
          <LookbookList
            weather={weather}
            weatherType={adjustedWeatherType}
            tempCondition={temperatureCondition}
          />
        </>
      )}

      <ConditionButtonGroup
        tempCondition={temperatureCondition}
        extremumTmp={weather.extremumTmp}
        handleTempConditionChange={handleTempConditionChange}
      />
    </S.Section>
  );
});

/** 온도를 기반으로 weather name 매핑 */
function mapTemperatureToWeatherName(temperature: number) {
  let name: keyof typeof WEATHER_TYPES = 'frigid';

  if (temperature >= 28) name = 'sweltering';
  if (temperature >= 23 && temperature < 28) name = 'hot';
  if (temperature >= 20 && temperature < 23) name = 'warm';
  if (temperature >= 17 && temperature < 20) name = 'moderate';
  if (temperature >= 12 && temperature < 17) name = 'cool';
  if (temperature >= 9 && temperature < 12) name = 'chilly';
  if (temperature >= 5 && temperature < 9) name = 'cold';

  return name;
}

/** 온도 상태에 따라 weather type 조정 */
function adjustWeatherTypeByCondition(
  temperatureCondition: TempCondition,
  weatherName: WeatherTypeName
) {
  let weatherNumber = Number(WEATHER_TYPES[weatherName]);

  if (temperatureCondition === 'COOL') weatherNumber = weatherNumber - 1;
  else if (temperatureCondition === 'WARM') weatherNumber = weatherNumber + 1;

  return String(weatherNumber) as WeatherType;
}

function initializeTempCondition(
  extremumTmp: number,
  userTempCondition?: TempCondition,
  tempParamOption?: TempCondition | string | null
): TempCondition {
  const tempCondition = tempParamOption ? tempParamOption : userTempCondition;

  if (!isValidTempCondition(extremumTmp, tempCondition)) return 'NORMAL';
  return tempCondition ? (tempCondition as TempCondition) : 'NORMAL';
}

function isValidTempCondition(
  extremumTmp: number,
  tempCondition?: TempCondition | string
) {
  if (tempCondition && !Options.has(tempCondition)) return false;

  if (
    (extremumTmp < 5 && tempCondition === 'WARM') ||
    (extremumTmp >= 28 && tempCondition === 'COOL')
  )
    return false;

  return true;
}
