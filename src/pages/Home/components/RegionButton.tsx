import LocationIcon from '@/components/icon/location';
import { Chip } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type LocationButtonProps = {
  region: string;
  isSelected?: boolean;
  onRegionClick: (region: string) => void;
};

const RegionButton = ({
  region,
  isSelected = false,
  onRegionClick,
}: LocationButtonProps) => {
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isLongPress, setIsLongPress] = useState(false);
  const navigate = useNavigate();

  const handlePointerDown = () => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      if (isSelected) return;
      setIsLongPress(true);
      navigate('/search', { state: { region } });
    }, 1000);

    setPressTimer(timer);
    setIsLongPress(false);
  };

  const handlePointerUp = () => {
    if (isSelected) return;

    if (pressTimer) {
      clearTimeout(pressTimer);

      if (!isLongPress) {
        onRegionClick(region);
      }

      setPressTimer(null);
    }
  };

  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Chip
        label={region}
        variant={isSelected ? 'filled' : 'outlined'}
        icon={isSelected ? <LocationIcon /> : undefined}
      />
    </button>
  );
};

export default RegionButton;
