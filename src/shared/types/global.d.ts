declare global {
  /** beforeinstallprompt 이벤트 type 정의 */
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
    prompt(): Promise<void>;
  }

  /** redux type 정의 */
  declare type RootState = ReturnType<
    typeof import('../../app/stores/index').store.getState
  >;
  declare type AppDispatch =
    typeof import('../../app/stores/index').store.dispatch;
}

export {};
