import styled from '@emotion/styled';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

type PopIconProps = {
  pop: number;
};

export const PopIcon = ({ pop }: PopIconProps) => {
  const filename = getFileName(pop);

  return (
    <S.IconWarp>
      <DotLottieReact src={`/lottie/pop/${filename}.lottie`} autoplay />
      <S.Pop>
        {pop}
        <span>%</span>
      </S.Pop>
    </S.IconWarp>
  );
};

function getFileName(pop: number): string {
  if (pop < 0) return '000';

  const adjustedPop = Math.min(Math.floor(pop / 10) * 10, 100);
  return adjustedPop.toString().padStart(3, '0');
}

const IconWarp = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
`;

const Pop = styled.strong`
  ${({ theme }) => theme.typo['subtitle-1']}
  position: absolute;
  top: 50%;
  left: 50%;
  color: ${({ theme }) => theme.colors.text.primary};
  transform: translate(-50%, -50%);

  & > span {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    ${({ theme }) => theme.typo.captionBold}
  }
`;

const S = { IconWarp, Pop };
