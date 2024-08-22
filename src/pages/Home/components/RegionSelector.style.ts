import styled from '@emotion/styled';
import { Chip, css } from '@mui/material';
import { Link } from 'react-router-dom';
import forwordPropOption from '@/utils/emotionForwordPropOption.ts';

export const Section = styled.section`
  position: relative;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 8px;
  overflow-x: auto;
  white-space: nowrap;

  &:-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const LinkWrap = styled(Link, forwordPropOption)<{
  $isScrollActive: boolean;
}>`
  position: sticky;
  right: 0;
  display: inline-block;
  width: 48px;
  height: 32px;
  background-color: ${(props) => props.theme.colors.white};

  ${({ $isScrollActive }) =>
    $isScrollActive &&
    css`
      &::after {
        position: absolute;
        top: 0;
        left: -16px;
        width: 16px;
        height: 100%;
        content: '';
        background: linear-gradient(
          270deg,
          #fff 0%,
          rgb(255 255 255 / 0%) 100%
        );
      }
    `}

  &::before {
    position: absolute;
    top: 0;
    right: -16px;
    width: 16px;
    height: 100%;
    content: '';
    background-color: ${(props) => props.theme.colors.white};
  }
`;

export const PlusChip = styled(Chip)`
  position: relative;
  width: 32px;
  height: 32px;

  & .MuiChip-label {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
