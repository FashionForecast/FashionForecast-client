import { WeatherType } from '@/types/weather';
import LookbookCard from './LookbookCard';

const LookbookTypes = Array.from(
  { length: 8 },
  (_, i) => String(i + 1) as WeatherType
);

const LookbookList = () => {
  return (
    <ol>
      {LookbookTypes.map((type) => (
        <LookbookCard key={type} type={type} />
      ))}
    </ol>
  );
};

export default LookbookList;
