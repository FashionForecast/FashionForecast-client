import CustomSnackbar from '@/components/CustomMui/CustomSnackbar';
import { createContext, useContext, useState } from 'react';
import styled from '@emotion/styled';

type SnackbarContextType = {
  openSnackbar: (message: string) => void;
};
const SnackbarContext = createContext<SnackbarContextType | null>(null);

type SnackbarProviedProps = { children: React.ReactNode };
export const SnackbarProvider = ({ children }: SnackbarProviedProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openSnackbar = (message: string) => {
    setMessage(message);
    setIsOpen(true);
  };

  const handleSnackbarClose = () => {
    setIsOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <SnackbarStyle
        open={isOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
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
