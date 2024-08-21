import LocationIcon from '@/components/icon/location';
import { Chip } from '@mui/material';

type LocationButtonProps = {
  label: string;
  isSelected?: boolean;
};

const RegionButton = ({ label, isSelected = false }: LocationButtonProps) => {
  return (
    <button>
      <Chip
        label={label}
        variant={isSelected ? 'filled' : 'outlined'}
        icon={isSelected ? <LocationIcon /> : undefined}
      />
    </button>
  );
};

export default RegionButton;
