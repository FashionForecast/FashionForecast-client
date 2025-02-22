import { GoBackButton, Header } from '@/shared/ui';

type TimeHeaderProps = {
  closeTimeSelector: () => void;
};

export const TimeHeader = ({ closeTimeSelector }: TimeHeaderProps) => {
  return (
    <Header
      leftSlot={<GoBackButton onClick={closeTimeSelector} />}
      centerTitle='외출시간 고르기'
    />
  );
};
