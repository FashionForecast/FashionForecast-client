import { forwardRef } from 'react';
import { S } from './style';
import 'keen-slider/keen-slider.min.css';

type SliderListProps = {
  handleSliderClick: () => void;
  children: React.ReactNode;
};

const SliderList = forwardRef(
  (
    { handleSliderClick, children }: SliderListProps,
    sliderRef: React.ForwardedRef<HTMLOListElement>
  ) => {
    return (
      <S.SliderList
        ref={sliderRef}
        className='keen-slider'
        onClick={handleSliderClick}
      >
        {children}
      </S.SliderList>
    );
  }
);

export default SliderList;
