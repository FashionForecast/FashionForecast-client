import { GoBackButton } from '@/shared/ui';
import { S } from './TimeHeader.style';
import { Header } from '@/shared/ui';

type TimeHeaderProps = {
  closeTimeSelector: () => void;
};

export const TimeHeader = ({ closeTimeSelector }: TimeHeaderProps) => {
  return (
    <Header>
      <GoBackButton onClick={closeTimeSelector} />

      <S.Title>외출시간 고르기</S.Title>
    </Header>
  );
};
