import { S } from './style';

type SliderItemProps = {
  $isSelected: boolean;
  $isFocussingSlider: boolean;
  children: React.ReactNode;
};

const SliderItem = ({
  $isSelected,
  $isFocussingSlider,
  children,
}: SliderItemProps) => {
  return (
    <S.SliderItem
      className='keen-slider__slide'
      $isFocussingSlider={$isFocussingSlider}
      $isSelected={$isSelected}
    >
      {children}
    </S.SliderItem>
  );
};

export default SliderItem;
