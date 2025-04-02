import { PropsWithChildren, useState } from 'react';

import { SnackbarContext, SnackbarContextType } from '@/shared/lib';
import { Snackbar } from '@/shared/ui';

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const [key, setKey] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [actionSlot, setActionSlot] = useState<React.ReactNode>();

  const open = (
    messageOrOption: Parameters<SnackbarContextType['open']>[0]
  ) => {
    setIsOpen(true);
    setKey((prev) => prev + 1);

    if (typeof messageOrOption === 'string') {
      const message = messageOrOption;
      setMessage(message);
      return;
    }

    const { message, action } = messageOrOption;
    setMessage(message);
    setActionSlot(action);
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
        action={actionSlot}
      />
    </SnackbarContext.Provider>
  );
};
