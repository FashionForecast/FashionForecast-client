import { WeatherType } from '@/types/weather';
import Showcase from './Showcase';
import ColorPalette from './colorPalette';

type EditProps = {
  weatherType: WeatherType;
};

const Edit = ({ weatherType }: EditProps) => {
  return (
    <>
      <Showcase weatherType={weatherType} />
      <ColorPalette />
    </>
  );
};

export default Edit;
