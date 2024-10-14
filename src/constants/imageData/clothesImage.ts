import 민소매 from '@/components/clothes/민소매';
import 반팔티 from '@/components/clothes/반팔티';
import 긴팔티 from '@/components/clothes/긴팔티';
import 후드티 from '@/components/clothes/후드티';
import 니트 from '@/components/clothes/니트';
import 트렌치코트 from '@/components/clothes/트렌치코트';
import 코트 from '@/components/clothes/코트';
import 패딩 from '@/components/clothes/패딩';
import 반바지 from '@/components/clothes/반바지';
import 바지 from '@/components/clothes/바지';
import 청바지 from '@/components/clothes/청바지';
import 기모바지 from '@/components/clothes/기모바지';
import 겉옷 from '@/components/clothes/겉옷';
import 접이식우산 from '@/components/clothes/접이식우산';
import 장우산 from '@/components/clothes/장우산';
import 히트텍 from '@/components/clothes/히트텍';
import 목도리 from '@/components/clothes/목도리';
import 겉옷장우산 from '@/components/clothes/겉옷장우산';
import 겉옷접이식우산 from '@/components/clothes/겉옷접이식우산';

import { ClothesImageName } from '@/types/clothes';

const clothesImage: Partial<
  Record<
    | Exclude<ClothesImageName, '슬랙스' | '면바지'>
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
  바지, // 슬랙스 = 면바지 이미지 동일
  청바지,
  겉옷,
  장우산,
  히트텍,
  목도리,
  겉옷장우산,
  겉옷접이식우산,
  '트렌치 코트': 트렌치코트,
  '기모 바지': 기모바지,
  '접이식 우산': 접이식우산,
};

export default clothesImage;
