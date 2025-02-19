import styled from '@emotion/styled';
import { css, IconButton as MuiIconButton } from '@mui/material';

import { forwardPropOption } from '@/shared/lib';

type IconButtonProps = React.ComponentProps<typeof MuiIconButton>;
type CustomVariant = 'standard' | 'contained';

type CustomIconButtonProps = IconButtonProps & {
  variant?: CustomVariant;
};

export const IconButton = ({
  variant = 'standard',
  children,
  ...rest
}: CustomIconButtonProps) => {
  return (
    <BaseIconButton $variant={variant} {...rest}>
      {children}
    </BaseIconButton>
  );
};

const BaseIconButton = styled(MuiIconButton, forwardPropOption)<{
  $variant: CustomVariant;
}>`
  ${({ $variant, theme }) =>
    $variant === 'contained' &&
    css`
      background-color: ${theme.colors.secondary.main};

      &:hover {
        background-color: ${theme.colors.secondary.dark};
      }
    `}
`;
