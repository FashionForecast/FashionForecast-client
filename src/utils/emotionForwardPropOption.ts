const forwardPropOption = {
  shouldForwardProp: (propName: string) => !propName.startsWith('$'),
};

export default forwardPropOption;
