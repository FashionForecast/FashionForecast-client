import { Footer } from '@/widgets/Footer';

import { ThicknessSetMenu } from '../../../../features/member/ui/ThicknessSetMenu/ThicknessSetMenu';

import GenderMenu from './GenderMenu/GenderMenu';
import { RegionSetMenu } from './RegionSetMenu/RegionSetMenu';
import { S } from './SettingList.style';
// import TimeSetMenu from './TimeSetMenu/TimeSetMenu';

export const SettingList = () => {
  return (
    <S.SettingSection>
      <S.ListWrap>
        <S.List>
          <RegionSetMenu />
          {/* <TimeSetMenu /> */}
          <ThicknessSetMenu />
          <GenderMenu />
        </S.List>
      </S.ListWrap>

      <Footer />
    </S.SettingSection>
  );
};
