declare global {
  declare type RootState = ReturnType<
    typeof import('../src/app/stores').store.getState
  >;
  declare type AppDispatch = typeof import('../src/app/stores').store.dispatch;
}

export {};
