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

const COOL = 'COOL',
  NORMAL = 'NORMAL',
  WARM = 'WARM';

const CONDITION_TYPE: Record<TemperatureCondition, string> = {
  COOL: '시원하게',
  NORMAL: '적당하게',
  WARM: '따뜻하게',
};

type FashionContentProps = {
  tab: Exclude<HomeTab, 'weather'>;
  weather: WeatherDto;
};

export const FashionContent = memo(({ tab, weather }: FashionContentProps) => {
  const member = useAppSelector((state) => state.member.info);
  const [searchParams] = useSearchParams();
  const [temperatureCondition, setTemperatureCondition] =
    useState<TemperatureCondition>(() =>
      initializeCondition({
        extremumTemperature: weather.extremumTmp,
        memberTemperatureCondition: member?.tempCondition,
        conditionParam: searchParams.get('temperatureCondition'),
      })
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

      {tab === 'clothes' && (
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

      {tab === 'lookbook' && (
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
            {CONDITION_TYPE['COOL']}
          </ToggleButton>
          <ToggleButton value={NORMAL}>{CONDITION_TYPE['NORMAL']}</ToggleButton>
          <ToggleButton
            value={WARM}
            clickableDisabled={weather.extremumTmp < 5}
          >
            {CONDITION_TYPE['WARM']}
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

type initializeConditionParams = {
  extremumTemperature: number;
  memberTemperatureCondition?: TemperatureCondition;
  conditionParam: TemperatureCondition | string | null;
};

/** temperatureCondition 상태 초기값 설정 */
function initializeCondition({
  extremumTemperature,
  memberTemperatureCondition,
  conditionParam,
}: initializeConditionParams): TemperatureCondition {
  // conditionParam이 존재하면 우선 적용, 없으면 회원 설정값 사용
  const condition = conditionParam
    ? conditionParam
    : memberTemperatureCondition;

  if (!isValidCondition(extremumTemperature, condition)) return 'NORMAL';

  return condition ? (condition as TemperatureCondition) : 'NORMAL';
}

function isValidCondition(
  extremumTmp: number,
  temperatureCondition?: TemperatureCondition | string
) {
  if (!temperatureCondition || !(temperatureCondition in CONDITION_TYPE)) {
    return false;
  }

  const memberTemperatureCondition =
    temperatureCondition as TemperatureCondition;

  // 회원의 설정값이 선택할 수 없는 condition인지 판별
  if (
    (memberTemperatureCondition === 'WARM' && extremumTmp < 5) ||
    (memberTemperatureCondition === 'COOL' && extremumTmp >= 28)
  ) {
    return false;
  }

  return true;
}
