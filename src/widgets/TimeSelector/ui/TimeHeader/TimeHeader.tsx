import { GoBackButton, Header } from '@/shared/ui';

type TimeHeaderProps = {
  onClose: () => void;
};

export const TimeHeader = ({ onClose }: TimeHeaderProps) => {
  return (
    <Header
      leftSlot={<GoBackButton onClick={onClose} />}
      centerTitle='외출시간 고르기'
    />
  );
};
