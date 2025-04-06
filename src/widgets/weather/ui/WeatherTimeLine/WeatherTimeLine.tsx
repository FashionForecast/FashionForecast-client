import { WeatherIcon } from '@/entities/weather';
import { Forecast, WeatherDto } from '@/entities/weather/model/types';

import { Chip } from '@/shared/ui';

import { InformationHeader } from '../InformationHeader/InformationHeader';

import { S } from './WeatherTimeLine.style';

const DIALOG_CONTENTS = [
  {
    title: '접이식 우산',
    icon: <WeatherIcon name='RAIN_DROP' />,
    description:
      '시간당 강수량이 3mm 이상이거나 강수 확률이 30% 이상이에요. 둘중 하나만 해당되니 외출상황에 맞추어 대비하세요!',
  },
  {
    title: '장우산',
    icon: <WeatherIcon name='RAIN' />,
    description:
      '시간당 강수량이 3mm 이상이면서 강수 확률이 30% 이상이에요. 꼭 우산을 챙겨야 해요!',
  },
  {
    title: '파란 장우산',
    icon: <WeatherIcon name='SHOWER' />,
    description:
      '시간당 강수량이 10mm 이상이에요. 이때는 가급적 외출하지 마세요!',
  },
];

type WeatherTimeLineProps = Pick<WeatherDto, 'forecasts'>;

export const WeatherTimeLine = ({ forecasts }: WeatherTimeLineProps) => {
  return (
    <S.WeatherTimeLineWrap>
      <InformationHeader
        title='시간별 날씨'
        dialogContentSlot={
          <ol>
            {DIALOG_CONTENTS.map(({ title, icon, description }) => (
              <S.DialogContentItem key={title}>
                {icon}
                <S.DialogContentDescription>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </S.DialogContentDescription>
              </S.DialogContentItem>
            ))}
          </ol>
        }
      />

      <S.TimeLineList>
        {forecasts.map((forecast, i) => (
          <S.TimeLineItem key={i} $isActive={forecast.isSelected}>
            <S.Time>{formatTime(forecast.fcstTime)}</S.Time>

            <S.WeatherIconWrap>
              <WeatherIcon
                name={getWeatherName(forecast)}
                isDayTime={isDayTime(forecast.fcstTime)}
              />
              {forecast.pcp > 0 && (
                <Chip
                  label={`${forecast.pop}% | 
                  ${Number(forecast.pcp).toFixed(1)}mm `}
                  color={getChipColor(forecast.pop, forecast.pcp)}
                />
              )}
            </S.WeatherIconWrap>

            <S.Line />

            <S.Temperature>{forecast.tmp}°C</S.Temperature>
          </S.TimeLineItem>
        ))}
      </S.TimeLineList>
    </S.WeatherTimeLineWrap>
  );
};

function formatTime(fcstTime: string) {
  let hour = Number(fcstTime.slice(0, 2));
  const AMPM = hour < 12 ? '오전' : '오후';

  if (hour >= 13) hour = hour - 12;

  return `${AMPM} ${hour.toString().padStart(2, '0')}시`;
}

function getChipColor(pop: number, pcp: number) {
  if (pcp >= 10) return 'primary';
  if (pop >= 30 && pcp >= 3) return 'primary';
  if (pop >= 30 || pcp >= 3) return '#CED5DF';
}

function isDayTime(fcstTime: string) {
  const hour = Number(fcstTime.slice(0, 2));
  return hour >= 6 && hour <= 18;
}

function getWeatherName(forecast: Forecast) {
  const { skyStatus, rainType, pop, pcp } = forecast;

  if (pcp >= 10) return 'SHOWER';
  if (pop >= 30 && pcp >= 3) return 'RAIN';
  if (pop >= 30 || pcp >= 3) return 'RAIN_DROP';

  return rainType === 'NONE' ? skyStatus : rainType;
}
