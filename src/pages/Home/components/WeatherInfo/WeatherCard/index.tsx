import { C, S } from './style';
import { WeatherResponseData } from '@/types/weather';

import PcpImage from '@/constants/imageData/pcpImage';
import TempImage from '@/constants/imageData/tempImage';
import PopImage from '@/constants/imageData/popImage';

type WeatherCardProps = Partial<
  Pick<WeatherResponseData, 'extremumTmp' | 'maximumPop' | 'maximumPcp'>
>;

const WeatherCard = ({
  extremumTmp = 0,
  maximumPop = 0,
  maximumPcp = 0,
}: WeatherCardProps) => {
  return (
    <div>
      <C.WeatherCard>
        <C.CustomPaper>
          <S.SubTitle>외출할 때 꼭 필요한 날씨 정보</S.SubTitle>
          <S.CustomCardContent>
            <S.CustomCardHeader>
              <C.Icon>{getTempImage(extremumTmp)}</C.Icon>
              <S.Header>{extremumTmp}°C</S.Header>
              <S.Subheader>{getTempText()}</S.Subheader>
            </S.CustomCardHeader>
            <S.CustomCardHeader>
              <C.Icon>{getPopImage(maximumPop)}</C.Icon>
              <S.Header>{maximumPop}%</S.Header>
              <S.Subheader>강수확률</S.Subheader>
            </S.CustomCardHeader>
            <S.CustomCardHeader>
              <C.Icon>{getPcpImage(maximumPcp)}</C.Icon>
              <S.Header>{maximumPcp}mm</S.Header>
              <S.Subheader>강수량</S.Subheader>
            </S.CustomCardHeader>
          </S.CustomCardContent>
        </C.CustomPaper>
      </C.WeatherCard>
    </div>
  );
};

export default WeatherCard;

function getTempText() {
  const month = new Date().getMonth() + 1;
  let text;

  switch (month) {
    case 12:
    case 1:
    case 2:
      text = '최저';
      break;
    case 6:
    case 7:
    case 8:
      text = '최고';
      break;
    default:
      text = '대표';
  }

  return `${text} 기온`;
}

function getTempImage(extremumTmp: number) {
  if (extremumTmp <= 16) return <TempImage.Cold />;
  if (extremumTmp <= 19) return <TempImage.Cool />;
  if (extremumTmp <= 22) return <TempImage.Moderate />;
  if (extremumTmp <= 27) return <TempImage.Warm />;
  return <TempImage.Hot />;
}

function getPopImage(maximumPop: number) {
  if (maximumPop <= 0) return <PopImage.Pop_0 />;
  if (maximumPop < 20) return <PopImage.Pop_10 />;
  if (maximumPop < 30) return <PopImage.Pop_20 />;
  if (maximumPop < 40) return <PopImage.Pop_30 />;
  if (maximumPop < 50) return <PopImage.Pop_40 />;
  if (maximumPop < 60) return <PopImage.Pop_50 />;
  if (maximumPop < 70) return <PopImage.Pop_60 />;
  if (maximumPop < 80) return <PopImage.Pop_70 />;
  if (maximumPop < 90) return <PopImage.Pop_80 />;
  if (maximumPop < 100) return <PopImage.Pop_90 />;
  return <PopImage.Pop_100 />;
}

function getPcpImage(maximumPcp: number) {
  if (maximumPcp <= 0) return <PcpImage.PClear />;
  if (maximumPcp < 3) return <PcpImage.PRaindrop />;
  return <PcpImage.PRain />;
}
