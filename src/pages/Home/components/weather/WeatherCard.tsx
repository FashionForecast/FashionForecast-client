import { getWeather } from '@/service/weather';
import { Card, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import handlePoP from './HandlePop';
import handlePcP from './HandlePcp';
import handleWeather from './HandleWeather';




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
    const WeatherImage = handleWeather(nowWeather);

    //현재 시간의 강수확률 가져오기
    const nowPop = data?.['data'][0].pop;
    const PopImage = handlePoP(Number(nowPop));

    

    //현재 시간의 강수량 가져오기
    const nowPcp = data?.['data'][0].pcp;
    const PcpImage = handlePcP(nowPcp);



    
    return (
        <div>
            {isError && <div>날씨 정보를 불러오는데 실패했습니다.</div>}
            <Card>
                <Paper>
                    현재 날씨 : {WeatherImage} 강수확률 : {PopImage}  강수량 : {PcpImage}

                </Paper>


            </Card>
        </div>
    );


} 

export default WeatherCard;



  