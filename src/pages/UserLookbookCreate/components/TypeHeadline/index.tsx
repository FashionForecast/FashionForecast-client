import { LOOKBOOK_WEATHER_TYPE } from '@/constants/Lookbook/data';
import { WeatherType } from '@/types/weather';
import { S } from './style';

type TypeHeadlineProps = {
  weatherType: WeatherType;
};

const TypeHeadline = ({ weatherType }: TypeHeadlineProps) => {
  return (
    <S.Headline $type={weatherType}>
      <h6>계절 {weatherType}</h6>
      <span>{LOOKBOOK_WEATHER_TYPE[weatherType].title}</span>
    </S.Headline>
  );
};

export default TypeHeadline;
