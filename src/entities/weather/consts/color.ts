import { theme } from '@/shared/styles';

import { WeatherTypeName } from '../model/types';

export const WEATHER_COLORS: Record<WeatherTypeName, string> = {
  sweltering: theme.colors.red[100],
  hot: theme.colors.orange[100],
  warm: theme.colors.yellow[100],
  moderate: theme.colors.lime[100],
  cool: theme.colors.green[100],
  chilly: theme.colors.cyan[100],
  cold: theme.colors.blue[100],
  frigid: theme.colors.deepPurple[100],
};
