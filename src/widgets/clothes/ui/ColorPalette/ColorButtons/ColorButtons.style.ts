import styled from '@emotion/styled';

const ColorButton = styled.button<{
  $color: string;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  padding: 2px;
  background-color: ${({ $color }) => $color};
  border-radius: 40%;

  &::before {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    content: '';
    border: 2px solid ${({ theme }) => theme.colors.blueGrey[900]};
    border-radius: 40%;
  }
`;

const IconWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
`;

export const S = { ColorButton, IconWrap };
