import 민소매 from '@/assets/clothesImage/민소매.svg?react';
import 반팔티 from '@/assets/clothesImage/반팔티.svg?react';
import 긴팔티 from '@/assets/clothesImage/긴팔티.svg?react';
import 후드티 from '@/assets/clothesImage/후드티.svg?react';
import 니트 from '@/assets/clothesImage/니트.svg?react';
import 트렌치코트 from '@/assets/clothesImage/트렌치코트.svg?react';
import 코트 from '@/assets/clothesImage/코트.svg?react';
import 패딩 from '@/assets/clothesImage/패딩.svg?react';
import 반바지 from '@/assets/clothesImage/반바지.svg?react';
import 바지 from '@/assets/clothesImage/바지.svg?react';
import 청바지 from '@/assets/clothesImage/청바지.svg?react';
import 겉옷 from '@/assets/clothesImage/겉옷.svg?react';
import 접이식우산 from '@/assets/clothesImage/접이식우산.svg?react';
import 장우산 from '@/assets/clothesImage/장우산.svg?react';
import 히트텍 from '@/assets/clothesImage/히트텍.svg?react';
import 목도리 from '@/assets/clothesImage/목도리.svg?react';

import { ClothesImageName } from '@/types/clothes';

const clothesImage: Partial<
  Record<
    Exclude<ClothesImageName, '슬랙스' | '면바지' | '기모 바지'> | '바지',
    React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & {
        title?: string;
      }
    >
  >
> = {
  민소매,
  반팔티,
  긴팔티,
  후드티,
  니트,
  코트,
  패딩,
  반바지,
  바지, // 슬랙스 = 면바지 = 기모 바지 이미지 동일
  청바지,
  겉옷,
  장우산,
  히트텍,
  목도리,
  '트렌치 코트': 트렌치코트,
  '접이식 우산': 접이식우산,
};

export default clothesImage;
