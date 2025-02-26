import { memo } from 'react';

import { TemperatureCondition } from '@/entities/weather';

import { ToggleButton, ToggleButtonGroup } from '@/shared/ui';

import { COOL, NORMAL, WARM } from '../FashionContent';

import { S } from './ConditionButtonGroup.style';

type ConditionButtonGroupProps = {
  TemperatureCondition: TemperatureCondition;
  extremumTmp: number;
  handleTemperatureConditionChange: (
    _e: React.MouseEvent<HTMLElement>,
    condition: TemperatureCondition
  ) => void;
};

const ConditionButtonGroup = ({
  TemperatureCondition,
  extremumTmp,
  handleTemperatureConditionChange,
}: ConditionButtonGroupProps) => {
  return (
    <S.ButtonWrap>
      <ToggleButtonGroup
        fullWidth
        exclusive
        value={TemperatureCondition}
        onChange={handleTemperatureConditionChange}
        size='large'
      >
        <ToggleButton value={COOL} disabled={extremumTmp >= 28}>
          시원하게
        </ToggleButton>
        <ToggleButton value={NORMAL}>적당하게</ToggleButton>
        <ToggleButton value={WARM} disabled={extremumTmp < 5}>
          따뜻하게
        </ToggleButton>
      </ToggleButtonGroup>
    </S.ButtonWrap>
  );
};

export default memo(ConditionButtonGroup);
