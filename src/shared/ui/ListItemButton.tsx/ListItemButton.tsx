import styled from '@emotion/styled';
import {
  css,
  ListItemIcon,
  ListItemButton as MuiListItemButton,
} from '@mui/material';

import { forwardPropOption } from '@/shared/lib';

type MuiListItemButtonProps = React.ComponentProps<typeof MuiListItemButton>;

type CustomColor = 'white' | 'grey';
type CustomDirection = 'horizontal' | 'vertical';
type LeftAndRightIconPosition = {
  left?: React.ReactNode;
  right?: React.ReactNode;
};
type TopAndBottomIconPosition = {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
};

type CustomBaseProps = {
  label: string;
  color?: CustomColor;
};

type HorizontalProps = {
  direction?: 'horizontal';
  description?: string;
  iconPosition?: LeftAndRightIconPosition;
};

type VerticalProps = {
  direction?: 'vertical';
  description?: never;
  iconPosition?: TopAndBottomIconPosition;
};

type CustomListItemProps = MuiListItemButtonProps &
  CustomBaseProps &
  (HorizontalProps | VerticalProps);

/**
 * - label - 텍스트
 * - description - 텍스트 부연 설명
 * - color - 색상
 * - direction - 콘텐츠의 방향
 * - iconPosition - 아이콘 위치
 * - 이외의 props - [MuiListItemButton](https://mui.com/material-ui/api/list-item-button/)
 */
export const ListItemButton = ({
  label,
  description,
  color = 'white',
  direction = 'horizontal',
  iconPosition = {},
  ...rest
}: CustomListItemProps) => {
  const { left, right } = iconPosition as LeftAndRightIconPosition;
  const { top, bottom } = iconPosition as TopAndBottomIconPosition;

  return (
    <BaseListItem
      $color={color}
      $direction={direction}
      $hasDescription={Boolean(description)}
      {...rest}
    >
      {direction === 'horizontal' && (
        <>
          <S.HorizontalLeftWrap>
            {left && <ListItemIcon className='left'>{left}</ListItemIcon>}

            <S.TextWrap>
              <S.Label>{label}</S.Label>
              {description && (
                <S.Description $isSelected={rest.selected} $color={color}>
                  {description}
                </S.Description>
              )}
            </S.TextWrap>
          </S.HorizontalLeftWrap>

          {right && <ListItemIcon className='right'>{right}</ListItemIcon>}
        </>
      )}

      {direction === 'vertical' && (
        <>
          {top && <ListItemIcon className='top'>{top}</ListItemIcon>}

          <S.Label>{label}</S.Label>

          {bottom && <ListItemIcon className='bottom'>{bottom}</ListItemIcon>}
        </>
      )}
    </BaseListItem>
  );
};

const BaseListItem = styled(MuiListItemButton, forwardPropOption)<{
  $color: CustomColor;
  $direction: CustomDirection;
  $hasDescription: boolean;
}>`
  ${({ theme }) => theme.typo['subtitle-1']}
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
  padding: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ $color, theme }) =>
    $color === 'grey' ? theme.colors.blueGrey[100] : theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius[2]};

  ${({ $direction }) =>
    $direction === 'vertical' &&
    css`
      flex-direction: column;
      gap: 8px;
      align-items: center;
      height: auto;
    `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.action.hover};
  }

  &.Mui-selected {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary.main};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.dark};
    }
  }

  & .MuiListItemIcon-root {
    display: flex;
    align-items: center;
    align-self: ${({ $direction, $hasDescription }) =>
      $hasDescription && $direction === 'horizontal' && 'flex-start'};
    justify-content: center;
    min-width: 24px;
    min-height: 24px;

    &.left {
      margin-right: 8px;
    }

    &.top {
      min-width: 32px;
      min-height: 32px;
    }
  }
`;

const HorizontalLeftWrap = styled.div`
  display: flex;
  align-items: center;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.strong`
  ${({ theme }) => theme.typo['subtitle-1']}
`;

const Description = styled.span<{ $color: CustomColor; $isSelected?: boolean }>`
  ${({ theme }) => theme.typo.caption}
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.white : theme.colors.primary.main}
`;

const S = {
  HorizontalLeftWrap,
  TextWrap,
  Label,
  Description,
};
