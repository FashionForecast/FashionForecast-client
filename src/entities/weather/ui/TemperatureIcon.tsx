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
  transform: translate(-50%, -50%);

  & > span {
    font-size: 12px;
  }
`;

const S = { IconWarp, Temperature };

// function getFileName(temperature: number) {
//   if (temperature >= 30) return String(temperature);
//   if (temperature < 0) {
//     const absolute = Math.abs(temperature);
//     if (temperature <= -30) return 'm' + String(absolute);
//     return 'm' + String(absolute).padStart(2, '0');
//   }

//   return String(temperature).padStart(2, '0');
// }
