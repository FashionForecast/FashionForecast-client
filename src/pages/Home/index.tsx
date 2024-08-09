import ExampleText from '@/components/EXAMPLE_TEXT';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { decrement, increment } from '@/redux/slice/EXAMPLE_counterSlice';
import { Button } from '@mui/material';

export default function Home() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

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
        <ExampleText>{count}</ExampleText>
        <Button
          variant='contained'
          color='warning'
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
      </div>
    </div>
  );
}
