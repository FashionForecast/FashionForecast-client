import styled from '@emotion/styled';

import { MenuItem } from '@/shared/ui';

const WithDrawalItem = styled(MenuItem)`
  color: ${({ theme }) => theme.colors.error.main};
`;

export const C = {
  WithDrawalItem,
};
