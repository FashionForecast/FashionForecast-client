import LocationIcon from '@/components/icon/Location';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './RegionButton.style';

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
  const [clickStartTime, setClickStartTime] = useState(0);
  const navigate = useNavigate();

  const handlePointerUp = () => {
    if (isSelected) return;

    const clickDuration = Date.now() - clickStartTime;

    if (clickDuration < 1000) {
      onRegionClick(region); // 숏클릭
    } else {
      navigate('/search', { state: { region } }); // 롱클릭
    }
  };

  const handlePointerDown = () => {
    if (isSelected) return;

    setClickStartTime(Date.now());
  };

  return (
    <S.Button onPointerUp={handlePointerUp} onPointerDown={handlePointerDown}>
      <S.LocationChip
        label={region}
        variant={isSelected ? 'filled' : 'outlined'}
        icon={isSelected ? <LocationIcon /> : undefined}
      />
    </S.Button>
  );
};

export default RegionButton;
