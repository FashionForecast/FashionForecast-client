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

function getFileName(pop: number) {
  if (pop >= 100) return '100';
  if (pop >= 90) return '090';
  if (pop >= 80) return '080';
  if (pop >= 70) return '070';
  if (pop >= 60) return '060';
  if (pop >= 50) return '050';
  if (pop >= 40) return '040';
  if (pop >= 30) return '030';
  if (pop >= 20) return '020';
  if (pop >= 10) return '010';

  return '000';
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
