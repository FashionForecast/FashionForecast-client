import { getWeather } from '@/service/weather';
import { useQuery } from '@tanstack/react-query';
import handlePoP from './HandlePop';
import HandlePcP from './HandlePcp';
import HandleTemp from './HandleTemp';
import {C,S} from './CardSummary.style'





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
            <C.WeatherCard>
                <C.CustomPaper>
                    <S.SubTitle>외출할 때 꼭 필요한 날씨 정보</S.SubTitle>
                    <S.CustomCardContent>
                        <S.CustomCardHeader>
                            <C.Icon>{TempImage}</C.Icon>
                            <S.Header>{typicalTemp}°C</S.Header>
                            <S.Subheader>기온</S.Subheader>
                        </S.CustomCardHeader>
                        <S.CustomCardHeader>
                            <C.Icon>{PopImage}</C.Icon>
                            <S.Header>{maxPop}%</S.Header>
                            <S.Subheader>강수확률</S.Subheader>
                        </S.CustomCardHeader>
                        <S.CustomCardHeader>
                            <C.Icon>{PcpImage}</C.Icon>
                            <S.Header>{maxPcp}mm</S.Header>
                            <S.Subheader>강수량</S.Subheader>
                        </S.CustomCardHeader>
                    </S.CustomCardContent>       
                </C.CustomPaper>
            </C.WeatherCard>

            
        </div>
    );


} 

export default WeatherCard;



  