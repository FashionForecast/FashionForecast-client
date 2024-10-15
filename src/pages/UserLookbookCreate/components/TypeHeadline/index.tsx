import { LOOKBOOK_WEATHER_TYPE } from '@/constants/Lookbook/data';
import { WeatherType } from '@/types/weather';
import { S } from './style';

type TypeHeadlineProps = {
  type: WeatherType;
};

const TypeHeadline = ({ type }: TypeHeadlineProps) => {
  return (
    <S.Headline $type={type}>
      <h6>계절 {type}</h6>
      <span>{LOOKBOOK_WEATHER_TYPE[type].title}</span>
    </S.Headline>
  );
};

export default TypeHeadline;
