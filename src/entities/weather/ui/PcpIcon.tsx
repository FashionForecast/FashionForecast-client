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

function getFileName(pcp: number) {
  if (pcp >= 10) return '10';
  if (pcp >= 9) return '09';
  if (pcp >= 8) return '08';
  if (pcp >= 7) return '07';
  if (pcp >= 6) return '06';
  if (pcp >= 5) return '05';
  if (pcp >= 4) return '04';
  if (pcp >= 3) return '03';
  if (pcp >= 2) return '02';
  if (pcp >= 1) return '01';

  return '00';
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
