import handlePoP from './HandlePop';
import HandlePcP from './HandlePcp';
import HandleTemp from './HandleTemp';
import { C, S } from './CardSummary.style';
import { WeatherResponse } from '@/types/weather';

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

  //외출 시간의 최대 강수확률 가져오기
  const PopImage = handlePoP(maximumPop);

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
              <S.Subheader>기온</S.Subheader>
            </S.CustomCardHeader>
            <S.CustomCardHeader>
              <C.Icon>{PopImage}</C.Icon>
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
