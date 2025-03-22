import { ClothesIconNames } from '../../model/types';
import { ClothesIcon } from '../ClothesIcon/ClothesIcon';

import { S } from './LookbookClothes.style';

type LookbookClothesProps = {
  topName: ClothesIconNames | null;
  topColor: string;
  bottomName: ClothesIconNames | null;
  bottomColor: string;
};

export const LookbookClothes = ({
  topName,
  topColor,
  bottomName,
  bottomColor,
}: LookbookClothesProps) => {
  return (
    <>
      <S.TopClothes>
        <ClothesIcon name={topName} color={topColor} />
      </S.TopClothes>
      <ClothesIcon name={bottomName} color={bottomColor} />
    </>
  );
};
