import { ChevronIcon } from '@/shared/ui';

import { MemberDto } from '../../model/types';

import { S } from './SetCard.style';

type SetCardProps = {
  icon: React.ReactNode;
  title: string;
  value: MemberDto[keyof MemberDto];
  disabled?: boolean;
  bottomBorder?: boolean;
};

export const SetCard = ({
  icon,
  title,
  value,
  disabled = false,
  bottomBorder = true,
}: SetCardProps) => {
  return (
    <S.Card $disabled={disabled} $bottomBorder={bottomBorder}>
      <S.IconWrap>{icon}</S.IconWrap>

      <S.Content>
        <S.Title>{title}</S.Title>
        <S.Data>{value}</S.Data>
      </S.Content>

      {!disabled && (
        <S.IconWrap>
          <ChevronIcon />
        </S.IconWrap>
      )}
    </S.Card>
  );
};
