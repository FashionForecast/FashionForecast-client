import { WeatherType } from '@/types/weather';
import { S } from './WeatherHeadline.style';
import { useLocation } from 'react-router-dom';
import { LocationState } from '../UserLookbookCreatePage';
import { TempCondition } from '@/pages/Home/ClothesSection/ClothesSection';
import { memo } from 'react';
import { LOOKBOOK_WEATHER_TYPE } from '@/constants/lookbook';

type WeatherHeadlineProps = {
  weatherType: WeatherType;
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

function getStandardMark(weatherType: WeatherType, tempOption?: TempCondition) {
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
    LOOKBOOK_WEATHER_TYPE[String(type) as WeatherType].title
  }일 때 ${text} 옷`;
}
