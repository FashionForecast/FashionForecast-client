import { ThemeType } from '@/shared/styles/theme';
import '@emotion/react';

/** 프로젝트 theme 타입 설정 확장 */
declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
