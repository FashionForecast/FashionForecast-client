import { C, S } from './TimeSelector.style';
import { Icon } from '@mui/material';
import CheckIcon from '@/components/icon/Check';
import HyphenIcon from '@/components/icon/Hyphen/index';
import { SelectedTime } from '..';
import TimeCarousel from './TimeCarousel';

const DAYS = ['오늘', '내일'];
const TIMES = Array.from({ length: 24 }, (_, i) => {
  const AMPM = i < 12 ? '오전' : '오후';
  let hour = i.toString().padStart(2, '0');

  if (i >= 13) hour = (i - 12).toString().padStart(2, '0');

  return `${AMPM} ${hour}시`;
});

type TimeSelectorProps = {
  selectedTime: SelectedTime;
};

function TimeSelector({ selectedTime }: TimeSelectorProps) {
  const startTimes = TIMES.filter(
    (_, i) => i >= Number(selectedTime.start.slice(11, 13))
  );
  const endTimes = TIMES.filter(
    (_, i) => i >= Number(selectedTime.end.slice(11, 13))
  );

  return (
    <S.TimeSelector>
      <S.TimeRange>
        <TimeCarousel times={DAYS} />

        <TimeCarousel times={startTimes} />

        <Icon>
          <HyphenIcon />
        </Icon>

        <TimeCarousel times={endTimes} />

        <C.CheckButton>
          <CheckIcon />
        </C.CheckButton>
      </S.TimeRange>
    </S.TimeSelector>
  );
}

export default TimeSelector;
