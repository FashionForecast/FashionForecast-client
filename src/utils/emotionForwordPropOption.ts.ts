const forwordPropOption = {
  shouldForwardProp: (propName: string) => !propName.startsWith('$'),
};

export default forwordPropOption;
