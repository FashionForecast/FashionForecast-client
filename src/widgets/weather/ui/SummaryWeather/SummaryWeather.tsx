import { useState } from 'react';

import { PcpIcon } from '@/entities/weather/ui/PcpIcon';
import { PopIcon } from '@/entities/weather/ui/PopIcon';
import { TemperatureIcon } from '@/entities/weather/ui/TemperatureIcon';

import { Button, Dialog, IconButton, InformationIcon } from '@/shared/ui';

import { S } from './SummaryWeather.style';

const DIALOG_CONTENTS = [
  {
    title: '대표기온',
    descriptions: [
      '여름철(5~9)월에는 외출 시간 중 최고기온을 나타내요.',
      '겨울철(10~4)월에는 외출 시간 중 최저기온을 나타내요.',
    ],
  },
  {
    title: '강수확률',
    descriptions: ['외출 시간 중 최대 시간당 강수확률(%)이에요.'],
  },
  {
    title: '강수량',
    descriptions: ['외출 시간 중 최대 시간당 강수량(mm)이에요.'],
  },
];

type SummaryWeatherProps = { temperature: number; pop: number; pcp: number };

export const SummaryWeather = ({
  temperature,
  pop,
  pcp,
}: SummaryWeatherProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const ICONS = [
    {
      component: <TemperatureIcon temperature={temperature} />,
      label: getTemperatureLabel(),
    },
    { component: <PopIcon pop={pop} />, label: '강수확률' },
    { component: <PcpIcon pcp={pcp} />, label: '강수량' },
  ];

  return (
    <>
      <S.SummaryWeatherWrap>
        <S.Header>
          <S.Title>한눈에 보는 외출시간</S.Title>
          <IconButton
            size='small'
            onClick={() => setIsDialogOpen((prev) => !prev)}
          >
            <InformationIcon />
          </IconButton>
        </S.Header>

        <S.IconGroup>
          {ICONS.map(({ component, label }) => (
            <S.WeatherIconWrap key={label}>
              {component}
              <S.IconLabel>{label}</S.IconLabel>
            </S.WeatherIconWrap>
          ))}
        </S.IconGroup>
      </S.SummaryWeatherWrap>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen((prev) => !prev)}
        titleSlot={'한눈에 보는 외출시간'}
        contentSlot={
          <S.DialogContentList>
            {DIALOG_CONTENTS.map(({ title, descriptions }) => (
              <li key={title}>
                <strong>{title}</strong>
                {descriptions.map((desc, index) => (
                  <S.Description key={index}>{desc}</S.Description>
                ))}
              </li>
            ))}
          </S.DialogContentList>
        }
        actionsSlot={
          <Button
            variant='outlined'
            onClick={() => setIsDialogOpen((prev) => !prev)}
          >
            닫기
          </Button>
        }
      />
    </>
  );
};

function getTemperatureLabel() {
  const month = new Date().getMonth() + 1;
  return month >= 5 && month <= 9 ? '최고 기온' : '최저 기온';
}
