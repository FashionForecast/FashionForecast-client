import { S } from './style';

type SliderItemProps = {
  $isSelected: boolean;
  children: React.ReactNode;
};

const SliderItem = ({ $isSelected, children }: SliderItemProps) => {
  return (
    <S.SliderItem className='keen-slider__slide' $isSelected={$isSelected}>
      {children}
    </S.SliderItem>
  );
};

export default SliderItem;
