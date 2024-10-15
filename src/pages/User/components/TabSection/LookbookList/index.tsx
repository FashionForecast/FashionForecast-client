import { WeatherType } from '@/types/weather';
import LookbookCard from './LookbookCard';
import { LOOKBOOK_WEATHER_TYPE } from '@/constants/Lookbook/data';

const LookbookTypes = Array.from(
  { length: 8 },
  (_, i) => String(i + 1) as WeatherType
);

const LookbookList = () => {
  return (
    <ol>
      {LookbookTypes.map((type) => (
        <LookbookCard
          key={type}
          type={type}
          title={LOOKBOOK_WEATHER_TYPE[type].title}
        />
      ))}
    </ol>
  );
};

export default LookbookList;
