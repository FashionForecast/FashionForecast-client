import useAppSelector from '@/hooks/useAppSelector';
import { getWeather } from '@/service/weather';
import { useQuery } from '@tanstack/react-query';
import WeatherCard from './components/weather/WeatherCard';
import Header from './components/Header';

const Home = () => {
  const currentRegion = useAppSelector((state) => state.currentRegion.value);
  const { data, isError } = useQuery({
    queryKey: ['weather', currentRegion?.region],
    queryFn: () => getWeather(currentRegion?.region),
    enabled: !!currentRegion,
  });

  return (
    <div>
      <Header />

      {isError && <span>날씨를 조회하지 못함</span>}
      {data?.data.forecasts.map((v, i) => (
        <div key={i}>
          <span>
            날짜: {v.fcstDate}, 시간: {v.fcstTime} 온도: {v.tmp} 강수확률:
            {v.pop} 강수량: {v.pcp}
          </span>
        </div>
      ))}

      <WeatherCard
        extremumTmp={data?.data.extremumTmp}
        maximumPop={data?.data.maximumPop}
        maximumPcp={data?.data.maximumPcp}
      />
    </div>
  );
};

export default Home;
