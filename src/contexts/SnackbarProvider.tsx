import { Snackbar } from '@mui/material';
import { createContext, useContext, useState } from 'react';

type SnackbarContextType = {
  openSnackbar: (message: string) => void;
};
const SnackbarContext = createContext<SnackbarContextType | null>(null);

type SnackbarProviedProps = { children: React.ReactNode };
export const SnackbarProvider = ({ children }: SnackbarProviedProps) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('asdfasdf');

  const openSnackbar = (message: string) => {
    setMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setMessage('');
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <Snackbar
        open={snackbarOpen}
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
