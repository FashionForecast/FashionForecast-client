import { ArrowIcon, Header, IconButton } from '@/shared/ui';

type TimeHeaderProps = {
  onClose: () => void;
};

export const TimeHeader = ({ onClose }: TimeHeaderProps) => {
  return (
    <Header
      leftSlot={
        <IconButton size='large' onClick={onClose}>
          <ArrowIcon />
        </IconButton>
      }
      centerTitle='외출시간 고르기'
    />
  );
};
