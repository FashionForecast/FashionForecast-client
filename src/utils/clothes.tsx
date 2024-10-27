import clothesImage from '@/constants/imageData/clothesImage';
import { ClothesImageName } from '@/types/clothes';

export function getClothesImageJSX(name: ClothesImageName, color: string) {
  const Image = clothesImage[name];
  return Image && <Image color={color} />;
}
