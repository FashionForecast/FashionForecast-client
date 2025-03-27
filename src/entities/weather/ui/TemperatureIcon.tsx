import styled from '@emotion/styled';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

type TemperatureIconProps = {
  temperature: number;
};

export const TemperatureIcon = ({ temperature }: TemperatureIconProps) => {
  const filename = getFileName(temperature);

  return (
    <S.IconWarp>
      <DotLottieReact src={`/lottie/temperature/${filename}.lottie`} autoplay />
      <S.Temperature>
        {temperature}
        <span>°C</span>
      </S.Temperature>
    </S.IconWarp>
  );
};

function getFileName(temperature: number) {
  if (temperature >= 30) return '30';
  if (temperature <= -30) return 'm30';

  const absTemperature = Math.abs(temperature);
  const prefix = temperature < 0 ? 'm' : '';

  return prefix + String(absTemperature).padStart(2, '0');
}

const IconWarp = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
`;

const Temperature = styled.strong`
  ${({ theme }) => theme.typo['subtitle-1']}
  position: absolute;
  top: 50%;
  left: 50%;
  color: ${({ theme }) => theme.colors.text.primary};
  transform: translate(-50%, -50%);

  & > span {
    ${({ theme }) => theme.typo.captionBold}
  }
`;

const S = { IconWarp, Temperature };
