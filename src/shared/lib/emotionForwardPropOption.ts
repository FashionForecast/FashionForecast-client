export const forwardPropOption = {
  shouldForwardProp: (propName: string) => !propName.startsWith('$'),
};
