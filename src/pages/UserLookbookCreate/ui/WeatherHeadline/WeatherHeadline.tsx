import { memo } from 'react';
import { useLocation } from 'react-router-dom';

import { TemperatureCondition, WeatherTypeNumber } from '@/entities/weather';

import { LOOKBOOK_WEATHER_TYPE } from '@/shared/consts';

import { LocationState } from '../ui/UserLookbookCreatePage';

import { S } from './WeatherHeadline.style';

type WeatherHeadlineProps = {
  weatherType: WeatherTypeNumber;
};

const WeatherHeadline = ({ weatherType }: WeatherHeadlineProps) => {
  const { title, subtitle, color } = LOOKBOOK_WEATHER_TYPE[weatherType];
  const { state }: LocationState = useLocation();
  const standardMark = getStandardMark(weatherType, state?.tempOption);

  return (
    <S.Headline $color={color}>
      <S.TitleWrap>
        <h6>{title}</h6>
        {standardMark && <S.StandardMark>{standardMark}</S.StandardMark>}
      </S.TitleWrap>

      <span>{subtitle}</span>
    </S.Headline>
  );
};

export default memo(WeatherHeadline);

function getStandardMark(
  weatherType: WeatherTypeNumber,
  tempOption?: TemperatureCondition
) {
  if (!tempOption || tempOption === 'NORMAL') return;

  let type = Number(weatherType);
  let text = '';

  if (tempOption === 'COOL') {
    type = type + 1;
    text = '시원한';
  } else {
    type = type - 1;
    text = '따뜻한';
  }

  return `${
    LOOKBOOK_WEATHER_TYPE[String(type) as WeatherTypeNumber].title
  }일 때 ${text} 옷`;
}
