import styled from '@emotion/styled';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

type PcpIconProps = {
  pcp: number;
};

export const PcpIcon = ({ pcp }: PcpIconProps) => {
  const filename = getFileName(pcp);

  return (
    <S.IconWarp>
      <DotLottieReact src={`/lottie/pcp/${filename}.lottie`} autoplay />
      <S.Pcp>
        {pcp}
        <span>mm</span>
      </S.Pcp>
    </S.IconWarp>
  );
};

function getFileName(pcp: number): string {
  if (pcp < 0) return '00';

  const adjustedPcp = Math.min(Math.floor(pcp), 10);
  return adjustedPcp.toString().padStart(2, '0');
}

const IconWarp = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
`;

const Pcp = styled.strong`
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

const S = { IconWarp, Pcp };
