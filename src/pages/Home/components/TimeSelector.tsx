import { C, S } from './TimeSelector.style';
import { Icon } from '@mui/material';
import CheckIcon from '@/components/icon/Check';
import HyphenIcon from '@/components/icon/Hyphen/index';

const DAYS = ['오늘', '내일'];
const TIMES = ['오전 00시', '오전 01시', '오후 11시'];

function TimeSelector() {
  return (
    <S.TimeSelector>
      <S.TimeRange>
        <S.DayList>
          {DAYS.map((day) => (
            <S.Times key={day}>{day}</S.Times>
          ))}
        </S.DayList>

        <S.TimeList>
          {TIMES.map((start) => (
            <S.Times key={start}>{start}</S.Times>
          ))}
        </S.TimeList>

        <Icon>
          <HyphenIcon />
        </Icon>

        <S.TimeList>
          {TIMES.map((end) => (
            <S.Times key={end}>{end}</S.Times>
          ))}
        </S.TimeList>

        <C.CheckButton>
          <CheckIcon />
        </C.CheckButton>
      </S.TimeRange>
    </S.TimeSelector>
  );
}

export default TimeSelector;
