import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { decrement, increment } from '@/redux/slice/EXAMPLE_counterSlice';
import { getWeather } from '@/service/weather';
import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const { data, isError } = useQuery({
    queryKey: ['weather'],
    queryFn: getWeather,
  });

  return (
    <div>
      홈
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
      {data?.data.map((v, i) => (
        <div key={i}>
          <span>
            날짜: {v.fcstDate}, 시간: {v.fcstTime} 온도: {v.tmp} 강수확률:
            {v.pop} 강수량: {v.pcp}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Home;
