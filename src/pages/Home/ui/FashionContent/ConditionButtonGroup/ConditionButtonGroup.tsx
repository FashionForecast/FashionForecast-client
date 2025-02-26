import { memo } from 'react';

import { TempCondition } from '@/entities/member/model/types';

import { ToggleButton, ToggleButtonGroup } from '@/shared/ui';

import { COOL, NORMAL, WARM } from '../FashionContent';

import { S } from './ConditionButtonGroup.style';

type ConditionButtonGroupProps = {
  tempCondition: TempCondition;
  extremumTmp: number;
  handleTempConditionChange: (
    _e: React.MouseEvent<HTMLElement>,
    condition: TempCondition
  ) => void;
};

const ConditionButtonGroup = ({
  tempCondition,
  extremumTmp,
  handleTempConditionChange,
}: ConditionButtonGroupProps) => {
  return (
    <S.ButtonWrap>
      <ToggleButtonGroup
        fullWidth
        exclusive
        value={tempCondition}
        onChange={handleTempConditionChange}
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
