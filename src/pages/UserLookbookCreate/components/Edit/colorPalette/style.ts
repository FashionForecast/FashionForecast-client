import CustomButton from '@/components/CustomMui/CustomButton';
import forwardPropOption from '@/utils/emotionForwardPropOption';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const ColorPaletteWrap = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const HandleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 38px;

  &::after {
    display: block;
    width: 30px;
    height: 6px;
    content: '';
    background-color: ${({ theme }) => theme.colors.blueGrey[400]};
    border-radius: 12px;
  }
`;

const TitleWrap = styled.div`
  ${({ theme }) => theme.typo['subtitle-1']}
  display: flex;
  align-items: center;
  padding: 0 16px 4px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  background-color: ${({ theme }) => theme.colors.blueGrey[600]};
  border-radius: 50%;
`;

const PaletteWrap = styled.div<{ $isColor: boolean }>`
  ${({ theme }) => theme.typo['body-2']}
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 12px 8px 16px;
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.text.secondary};

  ${({ $isColor }) =>
    $isColor &&
    css`
      display: inline-block;
      flex-basis: 0;
    `}
`;

const ColorButton = styled(CustomButton, forwardPropOption)<{ $color: string }>`
  min-width: 44px;
  min-height: 42px;
  padding: 0;
  margin: 6px;

  &.MuiButton-colorPrimary {
    background-color: ${({ $color }) => $color};

    &:hover {
      background-color: ${({ $color }) => $color};
    }
  }
`;

export const S = {
  ColorPaletteWrap,
  HandleBar,
  TitleWrap,
  Icon,
  PaletteWrap,
  ColorButton,
};
