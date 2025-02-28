import { memo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { HomeLookbookList, RecommendClothesList } from '@/widgets/clothes';

import {
  TemperatureCondition,
  WEATHER_TYPE,
  WeatherDto,
  WeatherTypeName,
  WeatherTypeNumber,
} from '@/entities/weather';

import { useSnackbar } from '@/shared/lib';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import { ToggleButton, ToggleButtonGroup } from '@/shared/ui';

import { HomeTab } from '../../model/types';

import { S } from './FashionContent.style';
import { Headline } from './Headline/Headline';

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
  const snackbar = useSnackbar();

  const weatherName = getWeatherName(weather.extremumTmp);
  const adjustedWeatherName = adjustWeatherName(
    temperatureCondition,
    weatherName
  );

  const handleTemperatureConditionChange = (
    _e: React.MouseEvent<HTMLElement>,
    clickedCondition: TemperatureCondition
  ) => {
    if (!clickedCondition) return;
    if (clickedCondition === 'COOL' && weather.extremumTmp >= 28) {
      snackbar.open('여기서 더 벗으시면 안돼요');
      return;
    }

    if (clickedCondition === 'WARM' && weather.extremumTmp < 5) {
      snackbar.open('여기서 더 껴입을 수 없어요');
      return;
    }

    setTemperatureCondition(clickedCondition);
  };

  return (
    <S.Section>
      <Headline weatherName={weatherName} />

      {tab === '옷' && (
        <RecommendClothesList
          weather={{
            extremumTmp: weather.extremumTmp,
            maxMinTmpDiff: weather.maxMinTmpDiff,
            maximumPop: weather.maximumPop,
            maximumPcp: weather.maximumPcp,
          }}
          weatherName={weatherName}
          adjustWeatherName={adjustedWeatherName}
          temperatureCondition={temperatureCondition}
        />
      )}

      {tab === '룩북' && member && (
        <>
          <HomeLookbookList
            extremumTemperature={weather.extremumTmp}
            adjustedWeatherName={adjustedWeatherName}
            temperatureCondition={temperatureCondition}
          />
        </>
      )}

      <S.ButtonWrap>
        <ToggleButtonGroup
          fullWidth
          exclusive
          value={temperatureCondition}
          onChange={handleTemperatureConditionChange}
          size='large'
        >
          <ToggleButton
            value={COOL}
            clickableDisabled={weather.extremumTmp >= 28}
          >
            시원하게
          </ToggleButton>
          <ToggleButton value={NORMAL}>적당하게</ToggleButton>
          <ToggleButton
            value={WARM}
            clickableDisabled={weather.extremumTmp < 5}
          >
            따뜻하게
          </ToggleButton>
        </ToggleButtonGroup>
      </S.ButtonWrap>
    </S.Section>
  );
});

/** 최고 또는 최저 온도로 weather name 반환 */
function getWeatherName(temperature: number) {
  let name: WeatherTypeName = 'frigid';

  if (temperature >= 28) name = 'sweltering';
  if (temperature >= 23 && temperature < 28) name = 'hot';
  if (temperature >= 20 && temperature < 23) name = 'warm';
  if (temperature >= 17 && temperature < 20) name = 'moderate';
  if (temperature >= 12 && temperature < 17) name = 'cool';
  if (temperature >= 9 && temperature < 12) name = 'chilly';
  if (temperature >= 5 && temperature < 9) name = 'cold';

  return name;
}

/** temperatureCondition 상태에 따라 weather name 조정 */
function adjustWeatherName(
  temperatureCondition: TemperatureCondition,
  weatherName: WeatherTypeName
) {
  let weatherNumber = Number(WEATHER_TYPE.nameToNumber[weatherName]);

  if (temperatureCondition === 'COOL') weatherNumber = weatherNumber - 1;
  else if (temperatureCondition === 'WARM') weatherNumber = weatherNumber + 1;

  return WEATHER_TYPE.numberToName[String(weatherNumber) as WeatherTypeNumber];
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
