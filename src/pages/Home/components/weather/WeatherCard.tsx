import { getWeather } from '@/service/weather';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import handlePoP from './HandlePop';
import HandlePcP from './HandlePcp';
import HandleWeather from './HandleWeather';
import * as S from './CardSummary.style';





const WeatherCard = () => {
    const { data, isError} = useQuery({
        queryKey: ['weather'],
        queryFn: getWeather,
      });

    const [weather, setWeather] = useState<string | ''>('');

    useEffect(() => {
        if (data) {
            const handleRainType = (rainType: string) => {
              if (rainType === 'NONE') {
                  setWeather(data['data'][0].skyStatus);
              } else {
                  setWeather(data['data'][0].rainType);
              }}
    
              
              handleRainType(data['data'][0].rainType);
            }
            
    }, [data]);


    //현재 시간의 날씨를 가져오기
    const nowWeather = weather
    const { weatherText, weatherIcon } = HandleWeather(nowWeather);

    //현재 시간의 강수확률 가져오기
    const nowPop = data?.['data'][0].pop;
    const PopImage = handlePoP(Number(nowPop));

    

    //현재 시간의 강수량 가져오기
    const nowPcp = data?.['data'][0].pcp;
    const {PcpText, PcpIcon} = HandlePcP(nowPcp);



    
    return (
        <div>
            {isError && <div>날씨 정보를 불러오는데 실패했습니다.</div>}
            <S.WeatherCardWrapper elevation={0}>
                <S.CardContent>
                    <S.WeatherIcon>{weatherIcon}</S.WeatherIcon>
                    <S.WeatherHeader>{weatherText}</S.WeatherHeader>
                    <S.WeatherSubheader>날씨</S.WeatherSubheader>
                </S.CardContent>
                <S.CardContent>
                    <S.WeatherIcon>{PopImage}</S.WeatherIcon>
                    <S.WeatherHeader>{nowPop}%</S.WeatherHeader>
                    <S.WeatherSubheader>강수확률</S.WeatherSubheader>
                </S.CardContent>
                <S.CardContent>
                    <S.WeatherIcon>{PcpIcon}</S.WeatherIcon>
                    <S.WeatherHeader>{PcpText}</S.WeatherHeader>
                    <S.WeatherSubheader>강수량</S.WeatherSubheader>
                </S.CardContent>
            </S.WeatherCardWrapper>

            
        </div>
    );


} 

export default WeatherCard;



  