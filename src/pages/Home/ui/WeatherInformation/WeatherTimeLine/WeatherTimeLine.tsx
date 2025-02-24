import { WeatherDto } from '@/entities/weather/model/types';

import { WeatherIcon } from '@/shared/ui';

import { S } from './WeatherTimeLine.style';

type WeatherTimeLimeProps = Pick<WeatherDto, 'forecasts'>;

const WeatherTimeLine = ({ forecasts }: WeatherTimeLimeProps) => {
  return (
    <S.List>
      {forecasts.map((v, i) => (
        <S.Item key={i}>
          <S.Time>{timeFormatting(v.fcstTime)}</S.Time>
          <S.ImageWrap>
            <WeatherIcon
              fcstTime={v.fcstTime}
              skyStatus={v.skyStatus}
              rainType={v.rainType}
            />
          </S.ImageWrap>
          <S.TmpPopWrap>
            <div>{v.tmp}°C</div>
            {Number(v.pop) > 0 && <S.Pop>{v.pop}%</S.Pop>}
          </S.TmpPopWrap>
        </S.Item>
      ))}
    </S.List>
  );
};

export default WeatherTimeLine;

function timeFormatting(fcstTime: string) {
  let hour = fcstTime.slice(0, 2);
  const numHour = Number(hour);
  const AMPM = numHour < 12 ? '오전' : '오후';

  if (numHour >= 13) hour = (numHour - 12).toString().padStart(2, '0');

  return `${AMPM} ${hour}시`;
}
