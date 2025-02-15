import styled from '@emotion/styled';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { CustomSnackbar } from '@/shared/ui';

type SnackbarContextType = {
  openSnackbar: (message: string) => void;
};
const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const [key, setKey] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openSnackbar = (message: string) => {
    setMessage(message);
    setIsOpen(true);
    setKey((prev) => prev + 1);
  };

  const handleSnackbarClose = () => {
    setIsOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <SnackbarStyle
        key={key}
        open={isOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        handleCloseOnSwipe={handleSnackbarClose}
        message={message}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

const SnackbarStyle = styled(CustomSnackbar)`
  bottom: 80px;
  min-width: max-content;

  & .MuiPaper-root {
    min-width: max-content;
    height: 32px;
  }

  @media (min-width: 600px) {
    bottom: 80px;
  }
`;
