import HandlePcP from './HandlePcp';
import HandleTemp from './HandleTemp';
import { C, S } from './WeatherCard.style';
import { WeatherResponse } from '@/types/weather';
import PopImage from '@/assets/popImage/popImage';

type WeatherCardProps = Partial<
  Pick<WeatherResponse['data'], 'extremumTmp' | 'maximumPop' | 'maximumPcp'>
>;

const WeatherCard = ({
  extremumTmp = 0,
  maximumPop = 0,
  maximumPcp = 0,
}: WeatherCardProps) => {
  //대표 기온 가져오기
  const TempImage = HandleTemp(extremumTmp);

  //외출 시간의 강수량 가져오기
  const PcpImage = HandlePcP(maximumPcp);

  return (
    <div>
      <C.WeatherCard>
        <C.CustomPaper>
          <S.SubTitle>외출할 때 꼭 필요한 날씨 정보</S.SubTitle>
          <S.CustomCardContent>
            <S.CustomCardHeader>
              <C.Icon>{TempImage}</C.Icon>
              <S.Header>{extremumTmp}°C</S.Header>
              <S.Subheader>{getTempText()}</S.Subheader>
            </S.CustomCardHeader>
            <S.CustomCardHeader>
              <C.Icon>{getPopImage(maximumPop)}</C.Icon>
              <S.Header>{maximumPop}%</S.Header>
              <S.Subheader>강수확률</S.Subheader>
            </S.CustomCardHeader>
            <S.CustomCardHeader>
              <C.Icon>{PcpImage}</C.Icon>
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
