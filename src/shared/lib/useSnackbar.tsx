import { createContext, useContext } from 'react';

type SnackbarContextType = {
  open: (message: string) => void;
};

export const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      'useSnackbar는 SnackbarProvider 내부에서 사용되어야 합니다.'
    );
  }
  return context;
};
