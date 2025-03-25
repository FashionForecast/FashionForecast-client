import {
  BottomClothesName,
  ClothesIconNames,
  TopClothesName,
} from '@/entities/clothes';
import { WeatherTypeName } from '@/entities/weather';

import { theme } from '@/shared/styles';

import { OutfitType } from './types';

export const SHOWCASE_HEIGHT = '278px';
export const DRAGGABLE_AREA_HEIGHT = '58px';
export const SELECT_CLOTHES_BUTTON_WRAP_HEIGHT = '64px';

export const CLOTHES_THUMBNAIL: Record<
  WeatherTypeName,
  Record<Extract<OutfitType, 'TOP' | 'BOTTOM'>, ClothesIconNames>
> = {
  sweltering: {
    TOP: '민소매',
    BOTTOM: '반바지',
  },
  hot: {
    TOP: '반팔티',
    BOTTOM: '슬랙스',
  },
  warm: {
    TOP: '긴팔티',
    BOTTOM: '면바지',
  },
  moderate: {
    TOP: '후드티',
    BOTTOM: '청바지',
  },
  cool: {
    TOP: '니트',
    BOTTOM: '청바지',
  },
  chilly: {
    TOP: '트렌치 코트',
    BOTTOM: '기모 바지',
  },
  cold: {
    TOP: '코트',
    BOTTOM: '기모 바지',
  },
  frigid: {
    TOP: '패딩',
    BOTTOM: '기모 바지',
  },
};

export const MAN_TOP_CLOTHES: TopClothesName[] = [
  '민소매',
  '반팔티',
  '반팔 폴로',
  '반팔 셔츠',
  '긴팔티',
  '긴팔 폴로',
  '긴팔 셔츠',
  '스웨트',
  '후드티',
  '니트',
  '재킷',
  '블레이저',
  '트렌치 코트',
  '코트',
  '필드 재킷',
  '패딩',
];

export const MAN_BOTTOM_CLOTHES: BottomClothesName[] = [
  '반바지',
  '면바지',
  '슬랙스',
  '청바지',
  '트레이닝 바지',
  '기모 바지',
];

export const WOMAN_BOTTOM_CLOTHES: BottomClothesName[] = [
  '반바지',
  '치마',
  '면바지',
  '슬랙스',
  '청바지',
  '트레이닝 바지',
  '스커트 스타킹',
  '긴치마',
  '기모 바지',
  '스커트 레깅스',
];

const {
  blueGrey,
  red,
  deepOrange,
  orange,
  amber,
  yellow,
  lime,
  lightGreen,
  green,
  teal,
  cyan,
  lightBlue,
  blue,
  indigo,
  deepPurple,
  purple,
  pink,
} = theme.colors;

export const COLOR_PALETTES = [
  blueGrey[50],
  blueGrey[100],
  blueGrey[300],
  blueGrey[500],
  blueGrey[700],
  blueGrey[900], //
  red[700],
  deepOrange[700],
  orange[700],
  amber[700],
  yellow[700],
  lime[700], //
  red[500],
  deepOrange[500],
  orange[500],
  amber[500],
  yellow[500],
  lime[500], //
  red[300],
  deepOrange[300],
  orange[300],
  amber[300],
  yellow[200],
  lime[200], //
  red[100],
  deepOrange[100],
  orange[100],
  amber[100],
  yellow[100],
  lime[100], //
  lightGreen[700],
  green[700],
  teal[700],
  cyan[700],
  lightBlue[700],
  blue[700], //
  lightGreen[500],
  green[500],
  teal[500],
  cyan[500],
  lightBlue[500],
  blue[500], //
  lightGreen[300],
  green[300],
  teal[300],
  cyan[300],
  lightBlue[300],
  blue[300], //
  lightGreen[100],
  green[100],
  teal[100],
  cyan[100],
  lightBlue[100],
  blue[100], //
  indigo[700],
  deepPurple[700],
  purple[700],
  pink[700],
  null,
  null, //
  indigo[500],
  deepPurple[500],
  purple[500],
  pink[500],
  null,
  null, //
  indigo[300],
  deepPurple[300],
  purple[300],
  pink[300],
  null,
  null, //
  indigo[100],
  deepPurple[100],
  purple[100],
  pink[100],
  null,
  null, //
];

export const CLOTHES_TO_CHIP_COLOR_MAP = new Map<string, string>([
  [blueGrey[50], blueGrey[100]],
  [blueGrey[100], blueGrey[100]],
  [blueGrey[300], blueGrey[100]],
  [blueGrey[500], blueGrey[100]],
  [blueGrey[700], blueGrey[100]],
  [blueGrey[900], blueGrey[100]],
  [red[100], red[100]],
  [red[300], red[100]],
  [red[500], red[100]],
  [red[700], red[100]],
  [deepOrange[100], deepOrange[100]],
  [deepOrange[300], deepOrange[100]],
  [deepOrange[500], deepOrange[100]],
  [deepOrange[700], deepOrange[100]],
  [orange[100], orange[100]],
  [orange[300], orange[100]],
  [orange[500], orange[100]],
  [orange[700], orange[100]],
  [amber[100], amber[100]],
  [amber[300], amber[100]],
  [amber[500], amber[100]],
  [amber[700], amber[100]],
  [yellow[100], yellow[100]],
  [yellow[200], yellow[100]],
  [yellow[500], yellow[100]],
  [yellow[700], yellow[100]],
  [lime[100], lime[100]],
  [lime[200], lime[100]],
  [lime[500], lime[100]],
  [lime[700], lime[100]],
  [lightGreen[100], lightGreen[100]],
  [lightGreen[300], lightGreen[100]],
  [lightGreen[500], lightGreen[100]],
  [lightGreen[700], lightGreen[100]],
  [green[100], green[100]],
  [green[300], green[100]],
  [green[500], green[100]],
  [green[700], green[100]],
  [teal[100], teal[100]],
  [teal[300], teal[100]],
  [teal[500], teal[100]],
  [teal[700], teal[100]],
  [cyan[100], cyan[100]],
  [cyan[300], cyan[100]],
  [cyan[500], cyan[100]],
  [cyan[700], cyan[100]],
  [lightBlue[100], lightBlue[100]],
  [lightBlue[300], lightBlue[100]],
  [lightBlue[500], lightBlue[100]],
  [lightBlue[700], lightBlue[100]],
  [blue[100], blue[100]],
  [blue[300], blue[100]],
  [blue[500], blue[100]],
  [blue[700], blue[100]],
  [indigo[100], indigo[100]],
  [indigo[300], indigo[100]],
  [indigo[500], indigo[100]],
  [indigo[700], indigo[100]],
  [deepPurple[100], deepPurple[100]],
  [deepPurple[300], deepPurple[100]],
  [deepPurple[500], deepPurple[100]],
  [deepPurple[700], deepPurple[100]],
  [purple[100], purple[100]],
  [purple[300], purple[100]],
  [purple[500], purple[100]],
  [purple[700], purple[100]],
  [pink[100], pink[100]],
  [pink[300], pink[100]],
  [pink[500], pink[100]],
  [pink[700], pink[100]],
]);
