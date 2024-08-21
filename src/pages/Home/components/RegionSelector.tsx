import PlusIcon from '@/components/icon/Plus';
import { Chip } from '@mui/material';
import RegionButton from './RegionButton';
import { Region } from '@/types/region';

type LocationSelectorProps = {
  regions: Region[];
};

const RegionSelector = ({ regions }: LocationSelectorProps) => {
  return (
    <div>
      {regions.map(({ region }, index) => (
        <RegionButton key={region} label={region} isSelected={index === 0} />
      ))}
      <Chip variant='outlined' icon={<PlusIcon />} />
    </div>
  );
};

export default RegionSelector;
