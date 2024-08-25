import { getWeather } from '@/service/weather';
import { useQuery } from '@tanstack/react-query';
import handlePoP from './HandlePop';
import HandlePcP from './HandlePcp';
import HandleTemp from './HandleTemp';
import * as S from './CardSummary.style';





const WeatherCard = () => {
    const { data, isError} = useQuery({
        queryKey: ['weather'],
        queryFn: getWeather,
      });


    //대표 기온 가져오기
    const typicalTemp = data?.data.extremumTmp ?? 0;
    const TempImage = HandleTemp(typicalTemp);

    //외출 시간의 최대 강수확률 가져오기
    const maxPop = data?.data.maximumPop ?? 0;
    const PopImage = handlePoP(maxPop);

    

    //외출 시간의 강수량 가져오기
    const maxPcp = data?.data.maximumPcp ?? 0;
    const PcpImage = HandlePcP(maxPcp);



    
    return (
        <div>
            {isError && <div>날씨 정보를 불러오는데 실패했습니다.</div>}
            <S.WeatherCard>
                <S.WeatherCardWrapper>
                    <S.SubTitle>외출할 때 꼭 필요한 날씨 정보</S.SubTitle>
                    <S.CardContent>
                        <S.CardHeader>
                            <S.WeatherIcon>{TempImage}</S.WeatherIcon>
                            <S.WeatherHeader>{typicalTemp}°C</S.WeatherHeader>
                            <S.WeatherSubheader>기온</S.WeatherSubheader>
                        </S.CardHeader>
                        <S.CardHeader>
                            <S.WeatherIcon>{PopImage}</S.WeatherIcon>
                            <S.WeatherHeader>{maxPop}%</S.WeatherHeader>
                            <S.WeatherSubheader>강수확률</S.WeatherSubheader>
                        </S.CardHeader>
                        <S.CardHeader>
                            <S.WeatherIcon>{PcpImage}</S.WeatherIcon>
                            <S.WeatherHeader>{maxPcp}mm</S.WeatherHeader>
                            <S.WeatherSubheader>강수량</S.WeatherSubheader>
                        </S.CardHeader>
                    </S.CardContent>
        
                </S.WeatherCardWrapper>
            </S.WeatherCard>

            
        </div>
    );


} 

export default WeatherCard;



  