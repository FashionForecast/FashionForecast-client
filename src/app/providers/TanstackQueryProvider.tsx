import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';

const queryCleint = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60,
    },
  },
});

export const TanstackQueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryCleint}>
      <ReactQueryDevtools buttonPosition='top-right' />
      {children}
    </QueryClientProvider>
  );
};
