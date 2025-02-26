import { memo, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { RecommendClothes } from '@/widgets/clothes';

import {
  TemperatureCondition,
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
    useState<TemperatureCondition>(() =>
      initializeTemperatureCondition(
        weather.extremumTmp,
        member?.TemperatureCondition,
        tempParamOption
      )
    );
  const weatherName = mapTemperatureToWeatherName(weather.extremumTmp);
  const adjustedWeatherType = adjustWeatherTypeByCondition(
    temperatureCondition,
    weatherName
  );

  const handleTemperatureConditionChange = useCallback(
    (_e: React.MouseEvent<HTMLElement>, condition: TemperatureCondition) => {
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
            TemperatureCondition={temperatureCondition}
          />
        </>
      )}

      <ConditionButtonGroup
        TemperatureCondition={temperatureCondition}
        extremumTmp={weather.extremumTmp}
        handleTemperatureConditionChange={handleTemperatureConditionChange}
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
  temperatureCondition: TemperatureCondition,
  weatherName: WeatherTypeName
) {
  let weatherNumber = Number(WEATHER_TYPES[weatherName]);

  if (temperatureCondition === 'COOL') weatherNumber = weatherNumber - 1;
  else if (temperatureCondition === 'WARM') weatherNumber = weatherNumber + 1;

  return String(weatherNumber) as WeatherType;
}

function initializeTemperatureCondition(
  extremumTmp: number,
  userTemperatureCondition?: TemperatureCondition,
  tempParamOption?: TemperatureCondition | string | null
): TemperatureCondition {
  const TemperatureCondition = tempParamOption
    ? tempParamOption
    : userTemperatureCondition;

  if (!isValidTemperatureCondition(extremumTmp, TemperatureCondition))
    return 'NORMAL';
  return TemperatureCondition
    ? (TemperatureCondition as TemperatureCondition)
    : 'NORMAL';
}

function isValidTemperatureCondition(
  extremumTmp: number,
  TemperatureCondition?: TemperatureCondition | string
) {
  if (TemperatureCondition && !Options.has(TemperatureCondition)) return false;

  if (
    (extremumTmp < 5 && TemperatureCondition === 'WARM') ||
    (extremumTmp >= 28 && TemperatureCondition === 'COOL')
  )
    return false;

  return true;
}
