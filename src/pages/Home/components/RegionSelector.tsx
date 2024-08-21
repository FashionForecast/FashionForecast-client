import PlusIcon from '@/components/icon/Plus';
import { Chip } from '@mui/material';
import RegionButton from './RegionButton';
import { Region } from '@/types/region';
import { Link } from 'react-router-dom';

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

      <Link to={'/search'}>
        <Chip variant='outlined' icon={<PlusIcon />} />
      </Link>
    </div>
  );
};

export default RegionSelector;
