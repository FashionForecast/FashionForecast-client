import styled from '@emotion/styled';

const GeolocationButtonWrap = styled.div`
  padding: 8px 16px;
`;

const ErrorBanner = styled.div`
  ${({ theme }) => theme.typo['body-2']}
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 12px 16px;
  color: #5f2120;
  background-color: #fdeded;
  border-radius: ${({ theme }) => theme.borderRadius[2]};
`;

const LeftContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const DialogContentItem = styled.li`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text.primary};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const DialogIconWrap = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
`;

const DialogSubItem = styled.li`
  display: flex;
  color: ${({ theme }) => theme.colors.text.secondary};

  &::before {
    margin: 0 4px;
    content: '·';
  }
`;

export const S = {
  GeolocationButtonWrap,
  ErrorBanner,
  LeftContent,
  DialogContentItem,
  DialogIconWrap,
  DialogSubItem,
};
