import { ToggleButtonGroup } from '@mui/material';
import { C, S } from './style';
import { COOL, NORMAL, TempCondition, WARM } from '..';
import { memo } from 'react';

type OptionButtonsProps = {
  tempCondition: TempCondition;
  extremumTmp: number;
  handleTempConditionChange: (
    _e: React.MouseEvent<HTMLElement>,
    condition: TempCondition
  ) => void;
};

const OptionButtons = ({
  tempCondition,
  extremumTmp,
  handleTempConditionChange,
}: OptionButtonsProps) => {
  return (
    <S.ButtonWrap>
      <ToggleButtonGroup
        fullWidth
        exclusive
        value={tempCondition}
        onChange={handleTempConditionChange}
      >
        <C.ToggleButton value={COOL} disabled={extremumTmp >= 28}>
          시원하게
        </C.ToggleButton>
        <C.ToggleButton value={NORMAL}>적당하게</C.ToggleButton>
        <C.ToggleButton value={WARM} disabled={extremumTmp < 5}>
          따뜻하게
        </C.ToggleButton>
      </ToggleButtonGroup>
    </S.ButtonWrap>
  );
};

export default memo(OptionButtons);
