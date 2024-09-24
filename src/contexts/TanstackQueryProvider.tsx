import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryCleint = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60,
    },
  },
});

type TanstackQueryProviderProps = {
  children: React.ReactNode;
};

export default function TanstackQueryProvider({
  children,
}: TanstackQueryProviderProps) {
  return (
    <QueryClientProvider client={queryCleint}>
      <ReactQueryDevtools buttonPosition='top-right' />
      {children}
    </QueryClientProvider>
  );
}
