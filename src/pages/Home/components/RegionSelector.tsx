import PlusIcon from '@/components/icon/Plus';
import { Chip } from '@mui/material';
import RegionButton from './RegionButton';
import { Region } from '@/types/region';

type LocationSelectorProps = {
  regions: Region[];
  onRegionClick: (region: string) => void;
};

const RegionSelector = ({ regions, onRegionClick }: LocationSelectorProps) => {
  return (
    <div>
      {regions.map(({ region }, index) => (
        <RegionButton
          key={region}
          region={region}
          isSelected={index === 0}
          onRegionClick={onRegionClick}
        />
      ))}
      <Chip variant='outlined' icon={<PlusIcon />} />
    </div>
  );
};

export default RegionSelector;
