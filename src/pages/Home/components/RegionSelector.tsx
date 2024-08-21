import PlusIcon from '@/components/icon/Plus';
import RegionButton from './RegionButton';
import { Region } from '@/types/region';
import * as S from './RegionSelector.style';

type LocationSelectorProps = {
  regions: Region[];
  onRegionClick: (region: string) => void;
};

const RegionSelector = ({ regions, onRegionClick }: LocationSelectorProps) => {
  return (
    <S.Section>
      {regions.map(({ region }, index) => (
        <RegionButton
          key={region}
          region={region}
          isSelected={index === 0}
          onRegionClick={onRegionClick}
        />
      ))}

      <S.LinkWrap to={'/search'}>
        <S.PlusChip variant='outlined' label={<PlusIcon />} />
      </S.LinkWrap>
    </S.Section>
  );
};

export default RegionSelector;
