import { WeatherDto } from '@/entities/weather/model/types';

import { PcpIcon, PopIcon, TemperatureIcon } from '@/shared/ui';

import { C, S } from './WeatherCard.style';

type WeatherCardProps = Partial<
  Pick<WeatherDto, 'extremumTmp' | 'maximumPop' | 'maximumPcp'>
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
              <C.Icon>
                <TemperatureIcon extremumTmp={extremumTmp} />
              </C.Icon>
              <S.Header>{extremumTmp}°C</S.Header>
              <S.Subheader>{getTempText()}</S.Subheader>
            </S.CustomCardHeader>
            <S.CustomCardHeader>
              <C.Icon>
                <PopIcon maximumPop={maximumPop} />
              </C.Icon>
              <S.Header>{maximumPop}%</S.Header>
              <S.Subheader>강수확률</S.Subheader>
            </S.CustomCardHeader>
            <S.CustomCardHeader>
              <C.Icon>
                <PcpIcon maximumPcp={maximumPcp} />
              </C.Icon>
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
