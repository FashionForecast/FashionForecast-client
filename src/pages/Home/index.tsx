import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { decrement, increment } from '@/redux/slice/EXAMPLE_counterSlice';
import { getWeather } from '@/service/weather';
import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import WeatherCard from './components/weather/WeatherCard';
import Header from './components/Header';

const Home = () => {
  const currentRegion = useAppSelector((state) => state.currentRegion.value);
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const { data, isError } = useQuery({
    queryKey: ['weather', currentRegion?.region],
    queryFn: () => getWeather(currentRegion?.nx, currentRegion?.ny),
    enabled: !!currentRegion,
  });

  return (
    <div>
      <Header />

      <div>
        <Button
          variant='contained'
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <span>{count}</span>
        <Button
          variant='contained'
          color='warning'
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
      </div>
      {isError && <span>날씨를 조회하지 못함</span>}
      {data?.data.forecasts.map((v, i) => (
        <div key={i}>
          <span>
            날짜: {v.fcstDate}, 시간: {v.fcstTime} 온도: {v.tmp} 강수확률:
            {v.pop} 강수량: {v.pcp}
          </span>
        </div>
      ))}
      <WeatherCard />
    </div>
  );
};

export default Home;
