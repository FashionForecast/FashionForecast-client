import PlusIcon from '@/components/icon/Plus';
import RegionButton from './RegionButton';
import { Region } from '@/types/region';
import { C, S } from './RegionSelector.style';
import { useEffect, useRef, useState } from 'react';

type LocationSelectorProps = {
  regions: Region[];
  onRegionClick: (region: string) => void;
};

const RegionSelector = ({ regions, onRegionClick }: LocationSelectorProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isScrollActive, setIsScrollActive] = useState(false);

  useEffect(() => {
    const sectionEl = sectionRef.current;

    if (sectionEl) {
      setIsScrollActive(sectionEl.scrollWidth > sectionEl.clientWidth);
    }
  }, []);

  return (
    <S.Section ref={sectionRef}>
      {regions.map(({ region }, index) => (
        <RegionButton
          key={region}
          region={region}
          isSelected={index === 0}
          onRegionClick={onRegionClick}
        />
      ))}

      <C.Link to={'/search'} $isScrollActive={isScrollActive}>
        <C.PlusChip variant='outlined' label={<PlusIcon />} />
      </C.Link>
    </S.Section>
  );
};

export default RegionSelector;
