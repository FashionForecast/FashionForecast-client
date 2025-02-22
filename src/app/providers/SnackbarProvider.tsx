import { PropsWithChildren, useState } from 'react';

import { SnackbarContext } from '@/shared/lib';
import { Snackbar } from '@/shared/ui';

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const [key, setKey] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const open = (message: string) => {
    setMessage(message);
    setIsOpen(true);
    setKey((prev) => prev + 1);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ open }}>
      {children}
      <Snackbar
        key={key}
        open={isOpen}
        message={message}
        autoHideDuration={3000}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
};
