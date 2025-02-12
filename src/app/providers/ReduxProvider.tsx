import { store } from '@/app/stores';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

export const ReduxProvider = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};
