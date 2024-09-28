import 민소매 from '@/assets/svg/clothes/민소매.svg?react';
import 반팔티 from '@/assets/svg/clothes/반팔티.svg?react';
import 긴팔티 from '@/assets/svg/clothes/긴팔티.svg?react';
import 후드티 from '@/assets/svg/clothes/후드티.svg?react';
import 니트 from '@/assets/svg/clothes/니트.svg?react';
import 트렌치코트 from '@/assets/svg/clothes/트렌치코트.svg?react';
import 코트 from '@/assets/svg/clothes/코트.svg?react';
import 패딩 from '@/assets/svg/clothes/패딩.svg?react';
import 반바지 from '@/assets/svg/clothes/반바지.svg?react';
import 바지 from '@/assets/svg/clothes/바지.svg?react';
import 청바지 from '@/assets/svg/clothes/청바지.svg?react';
import 겉옷 from '@/assets/svg/clothes/겉옷.svg?react';
import 접이식우산 from '@/assets/svg/clothes/접이식우산.svg?react';
import 장우산 from '@/assets/svg/clothes/장우산.svg?react';
import 히트텍 from '@/assets/svg/clothes/히트텍.svg?react';
import 목도리 from '@/assets/svg/clothes/목도리.svg?react';
import 겉옷장우산 from '@/assets/svg/clothes/겉옷장우산.svg?react';
import 겉옷접이식우산 from '@/assets/svg/clothes/겉옷접이식우산.svg?react';

import { ClothesImageName } from '@/types/clothes';

const clothesImage: Partial<
  Record<
    | Exclude<ClothesImageName, '슬랙스' | '면바지' | '기모 바지'>
    | '바지'
    | '겉옷장우산'
    | '겉옷접이식우산',
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
  겉옷장우산,
  겉옷접이식우산,
  '트렌치 코트': 트렌치코트,
  '접이식 우산': 접이식우산,
};

export default clothesImage;
