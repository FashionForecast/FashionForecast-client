import { AppTheme } from '@/shared/styles';
import '@emotion/react';

/** emotion Theme을 AppTheme으로 확장  */
declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
