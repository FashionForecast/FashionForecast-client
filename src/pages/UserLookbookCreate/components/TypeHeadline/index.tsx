import { LOOKBOOK_WEATHER_TYPE } from '@/constants/Lookbook/data';
import { WeatherType } from '@/types/weather';
import { S } from './style';

type TypeHeadlineProps = {
  weatherType: WeatherType;
};

const TypeHeadline = ({ weatherType }: TypeHeadlineProps) => {
  const { title, subtitle, color } = LOOKBOOK_WEATHER_TYPE[weatherType];

  return (
    <S.Headline $color={color}>
      <h6>{title}</h6>
      <span>{subtitle}</span>
    </S.Headline>
  );
};

export default TypeHeadline;
