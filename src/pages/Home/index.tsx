import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { decrement, increment } from '@/redux/slice/EXAMPLE_counterSlice';
import { getWeather } from '@/service/weather';
import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import RegionSelector from './components/RegionSelector';
import { useState } from 'react';
import { Region } from '@/types/region';
import { MY_REGIONS } from '@/constants/localStorage/key';
import Header from './components/Header';

const Home = () => {
  const [regions, setRegions] = useState<Region[]>(
    JSON.parse(localStorage.getItem(MY_REGIONS) || '[]')
  );
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const { data, isError } = useQuery({
    queryKey: ['weather'],
    queryFn: getWeather,
  });

  const handleRegionClick = (region: string) => {
    setRegions((prev) => {
      if (prev[0].region === region) {
        return prev;
      }

      const list = [...prev];
      const targetIndex = list.findIndex((v) => v.region === region);

      [list[0], list[targetIndex]] = [list[targetIndex], list[0]];

      localStorage.setItem(MY_REGIONS, JSON.stringify(list));

      return list;
    });
  };

  return (
    <div>
      <Header />
      <div>
        <RegionSelector regions={regions} onRegionClick={handleRegionClick} />
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
