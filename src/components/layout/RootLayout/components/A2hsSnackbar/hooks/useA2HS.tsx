import { useEffect, useState } from 'react';

const useA2HS = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();

      setTimeout(() => setDeferredPrompt(e), 5000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const installApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          clearPrompt;
        }
      });
    }
  };

  const clearPrompt = () => {
    setDeferredPrompt(null);
  };

  return { deferredPrompt, installApp, clearPrompt };
};

export default useA2HS;
