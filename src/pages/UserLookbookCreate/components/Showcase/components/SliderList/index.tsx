import { forwardRef } from 'react';
import { S } from './style';
import 'keen-slider/keen-slider.min.css';

type SliderListProps = {
  children: React.ReactNode;
};

const SliderList = forwardRef(
  (
    { children }: SliderListProps,
    sliderRef: React.ForwardedRef<HTMLOListElement>
  ) => {
    return (
      <S.SliderList ref={sliderRef} className='keen-slider'>
        {children}
      </S.SliderList>
    );
  }
);

export default SliderList;
